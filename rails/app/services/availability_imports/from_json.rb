class AvailabilityImports::FromJson
  attr_reader :import

  def initialize(import)
    @import = import
  end

  def self.perform(import)
    new(import).perform
  end

  def perform
    create_availabilities
    update_import
    delete_availabilities

    nil
  end

  def update_import
    import.update_attributes(
      history_open: history_open,
      history_filled: history_filled,
      date_start: date_start,
      date_end: date_end
    )
  end

  def still_open_availabilities
    AvailabilityImports::SqlBuilder.scope(range_format)
  end

  def create_availabilities
    Availability.bulk_insert(ignore: true) do |availabilities|
      range_format.each do |site_id, avail_dates|
        avail_dates.each do |avail_date_range|
          availabilities.add(
            availability_import_id: import.id,
            site_id: site_id,
            avail_at: avail_date_range
          )
        end
      end
    end
  end

  def delete_availabilities
    Availability.where(site_id: sites.map(&:id)).where.not(availability_import_id: import.id).delete_all
  end

  def history_open
    AvailabilityImports::History.all_open(import.id, sites.map(&:id))
  end

  def history_filled
    AvailabilityImports::History.all_filled(import.id, sites.map(&:id))
  end

  def sites_for(ids)
    ids = ids.map(&:to_s)
    sites.select { |site| ids.include?(site.ext_site_id) }
  end

  def sites
    @sites ||= Site
               .where(
                 import.site_group_id ? { site_group_id: import.site_group_id } : { facility_id: import.facility_id }
               )
               .select(:id, :ext_site_id)
               .all
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
    @body ||= JSON.parse(HTTParty.get(url).body)
  end

  def results
    return {} if body['results'].empty?
    return @results if @results.present?

    @results = {}
    body['results'].each do |avail_date, ext_sites|
      avail_date_date = Date.strptime(avail_date, '%m/%d/%Y')
      site_ids = sites_for(ext_sites).map(&:id)
      @results[avail_date_date] = site_ids
    end
    @results
  end

  def range_format
    return @range_format if @range_format.present?

    @range_format = {}
    results.each do |avail_date, date_sites|
      date_sites.each do |site|
        @range_format[site] ||= []
        @range_format[site].push(avail_date)
      end
    end

    @range_format.each do |k, v|
      @range_format[k] = AvailabilityImports::RangeBuilder.to_range(v)
    end
  end
end
