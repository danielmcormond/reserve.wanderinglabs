module AvailabilityImports
  class History
    attr_reader :site_id, :a_id

    def initialize(site_id, a_id)
      @site_id = site_id
      @a_id = a_id
    end

    def self.all_open(import_id, sites)
      sites.flat_map do |site_id|
        new(site_id, import_id).history_open.map do |avail_date|
          {site_id: site_id, avail_date: avail_date}
        end
      end
    end

    def self.all_filled(import_id, sites)
      sites.flat_map do |site_id|
        new(site_id, import_id).history_filled.map do |avail_date|
          {site_id: site_id, avail_date: avail_date}
        end
      end
    end

    def history_filled
      history_open(true)
    end

    def history_open(filled = false)
      sql = <<-SQL
        SELECT * FROM (
          SELECT
            GENERATE_SERIES(lower(avail_at), (upper(avail_at) - INTERVAL '1 day'), '1 day'::interval)::date AS avail_date
          FROM availabilities
          WHERE site_id = #{site_id} AND availability_import_id #{ filled ? '!=' : '=' } #{a_id}
        ) AS a
        WHERE a.avail_date NOT IN (
          SELECT
            GENERATE_SERIES(lower(avail_at), (upper(avail_at) - INTERVAL '1 day'), '1 day'::interval)::date AS avail_dates
          FROM availabilities
          WHERE site_id = #{site_id} AND availability_import_id #{ filled ? '=' : '!=' } #{a_id}
        )
      SQL
      Availability.connection.execute(sql).values.flatten
    end
  end
end
