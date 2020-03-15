module AvailabilityMatcher
  class Search
    attr_reader :availability_request

    def initialize(availability_request)
      @availability_request = availability_request
    end

    def search
      ActiveRecord::Base.connection.execute(matcher_sql).map(&:symbolize_keys).select { |match| arrival_days_match?(match[:avail_at]) }
    end

    private

    def daterange
      "daterange('#{availability_request.date_start}', '#{availability_request.date_end}', '[]')"
    end

    def intersection
      "(avail_at * #{daterange})::daterange"
    end

    def length_sql
      "upper(avail_at) - lower(#{intersection})"
    end

    def matcher_sql
      <<-SQL
        SELECT site_id, avail_at, lower(#{intersection}) as avail_min, #{length_sql} as length
        FROM availabilities
        WHERE
          site_id IN(#{site_ids}) AND
          #{length_sql} >= #{availability_request.stay_length}
      SQL
    end

    def arrival_days_match?(match)
      return true if availability_request.arrival_days.nil? || availability_request.arrival_days.empty?

      match_range = (Date.parse(match.split(',')[0].delete('['))...Date.parse(match.split(',')[1].delete(')')))

      availability_request.dow_ranges.any? do |range|
        match_range.include?(range)
      end
    end

    def site_ids
      availability_request.site_ids.size.positive? ? availability_request.site_ids.join(', ') : '0'
    end
  end
end
