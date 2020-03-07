class AvailabilityImports::FromJson
  attr_reader :import

  def initialize(import)
    @import = import
  end

  def self.perform(import)
    new(import).perform
  end

  def perform
    # t1 = Process.clock_gettime(Process::CLOCK_MONOTONIC)
    history_open = []
    update_ids = []


    # p range_format


    # p still_open_availabilities.to_sql
    # still_open_availabilities.all.each do |availability|
    #   next if results[availability.avail_date].nil? &&
    #           results[availability.avail_date].exclude?(availability.site_id)

    #   update_ids << availability.id
    #   results[availability.avail_date].delete(availability.site_id)
    # end



    create_availabilities(range_format)
    update_availabilities(update_ids)
    update_import(history_open)
    delete_availabilities

    # t2 = Process.clock_gettime(Process::CLOCK_MONOTONIC)
    # timing = (t2 - t1) * 1000
    # GRAYLOG.notify!(
    #   facility: 'import',
    #   short_message: "Import Complete: #{import.id}:#{import.facility_id}",
    #   facility_id: import.facility_id,
    #   timing: timing,
    # )
    nil
  end

  def update_import(history_open)
    import.update_attributes(
      history_open: history_open,
      history_filled: history_filled,
      date_start: date_start,
      date_end: date_end,
    )
  end

  def still_open_availabilities
    AvailabilityImports::SqlBuilder.scope(range_format)
  end

  def create_availabilities(openings)
    availabilities = []
    openings.each do |site_id, avail_dates|
      avail_dates.each do |avail_date_range|
        availabilities.push([
          import.id,
          site_id,
          avail_date_range,
          Time.now,
          Time.now
      ])
      end
    end

    ### HERE - WORK HERE -- ##
    ## NEEDED AREL 9 for Arel::InsertManager.new.create_values_list
    sql_query = %(
      INSERT INTO "availabilities"
        ("availability_import_id","site_id","avail_at","created_at","updated_at")
    #{Arel::InsertManager.new.create_values_list(availabilities).to_sql}
     ON CONFLICT ON CONSTRAINT constraint_site_id_avail DO UPDATE SET availability_import_id=EXCLUDED.availability_import_id, updated_at=EXCLUDED.updated_at

    )

    Availability.connection.exec_insert(sql_query)
  end

  def update_availabilities(ids)
    Availability.where(id: ids).update_all(availability_import_id: import.id)
  end

  def delete_availabilities
    Availability.where(site_id: facility_sites.map(&:id)).where.not(availability_import_id: import.id).delete_all
  end

  def history_filled
    return unless last_import.present?

    Availability
      .where(availability_import_id: last_import.id)
      .map { |a| { site_id: a.site_id, avail_date: a.avail_date } }
  end

  def last_import
    @last_import ||= AvailabilityImport
                     .where.not(id: import.id)
                     .where(facility_id: import.facility_id)
                     .last
  end

  def sites_for(ids)
    ids = ids.map(&:to_s)
    facility_sites.select { |site| ids.include?(site.ext_site_id) }
  end

  def facility_sites
    @facility_sites ||= Site
                        .where(facility_id: import.facility_id)
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
    results.each do |avail_date, sites|
      sites.each do |site|
        @range_format[site] ||= []
        @range_format[site].push(avail_date)

        # history_open << { site_id: site, avail_date: avail_date }
      end
    end

    @range_format.each do |k, v|
      @range_format[k] = AvailabilityImports::RangeBuilder.to_range(v)
    end
  end
end
