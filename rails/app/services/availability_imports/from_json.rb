class AvailabilityImports::FromJson
  attr_reader :import

  def initialize(import)
    @import = import
  end

  def self.perform(import)
    new(import).perform
  end

  def perform
    t1 = Process.clock_gettime(Process::CLOCK_MONOTONIC)
    results = {}
    or_array = body['results'].map do |avail_date, ext_sites|
      avail_date_date = Date.strptime(avail_date, '%m/%d/%Y')
      site_ids = sites_for(ext_sites).map(&:id)
      results[avail_date_date] = site_ids
      Availability.where(
        site_id: site_ids,
        avail_date: avail_date_date,
      ).to_sql.gsub(/.*WHERE /, '')
    end
    or_string = '(' + or_array.join(') OR (') + ')'

    scope = Availability.where(or_string)

    history_open = []
    update_ids = []

    scope.all.each do |availability|
      # site = availability.site
      avail_date = availability.avail_date #.strftime('%-m/%-d/%Y')
      if results[avail_date].nil?
        Rails.logger.warn("DATE MISMATCH #{import.id} // #{avail_date} // #{availability.id}")
        next
      end
      next unless results[avail_date].include?(availability.site_id)

      update_ids << availability.id
      results[avail_date].delete(availability.site_id)
    end

    results.each do |avail_date, sites|
      sites.each do |site|
        history_open << { site_id: site, avail_date: avail_date }
      end
    end

    create_availabilities(history_open)
    update_availabilities(update_ids)
    update_import(history_open)
    delete_availabilities

    t2 = Process.clock_gettime(Process::CLOCK_MONOTONIC)
    timing = (t2 - t1) * 1000;
    GRAYLOG.notify!(
      facility: 'import',
      short_message: "Import Complete: #{import.id}:#{import.facility_id}",
      facility_id: import.facility_id,
      timing: timing,
    )
  end

  def update_import(history_open)
    import.update_attributes(
      history_open: history_open,
      history_filled: history_filled,
      date_start: date_start,
      date_end: date_end,
    )
  end

  def create_availabilities(openings)
    Availability.bulk_insert do |avail|
      openings.each do |open_site|
        avail.add(availability_import_id: import.id, site_id: open_site[:site_id], avail_date: open_site[:avail_date])
      end
    end
  end

  def update_availabilities(ids)
    Availability.where(id: ids).update_all(availability_import_id: import.id)
  end

  def delete_availabilities
    return unless last_import.present?
    Availability.where(availability_import_id: last_import.id).delete_all
  end

  def history_filled
    return unless last_import.present?
    Availability.where(availability_import_id: last_import.id).map { |a| { site_id: a.site_id, avail_date: a.avail_date } }
  end

  def last_import
    @_last_import ||= AvailabilityImport.where.not(id: import.id).where(facility_id: import.facility_id).last
  end

  def sites_for(ids)
    facility_sites.select { |site| ids.include?(site.ext_site_id) }
  end

  def facility_sites
    @facility_sites ||= Site.where(facility_id: import.facility_id).select(:id, :ext_site_id).all
  end

  def url
    "http://#{bucket}.s3.amazonaws.com/#{import.facility_id}/#{import.run_id}.json"
  end

  def bucket
    Rails.env.production? ? 'availabilities-prd' : 'availabilities-dev'
  end

  def date_start
    body['startDate'] ? Date.strptime(body['startDate'], '%m/%d/%Y') : Time.now.to_date
  end

  def date_end
    body['endDate'] ? Date.strptime(body['endDate'], '%m/%d/%Y') : 6.months.from_now.to_date
  end

  def body
    @_body ||= JSON.parse(HTTParty.get(url).body)
  end
end
