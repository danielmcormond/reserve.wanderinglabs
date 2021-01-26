module AvailabilityMatcher
  class Calendar
    attr_reader :availability_request

    def initialize(availability_request)
      @availability_request = availability_request
    end

    def results
      hash = {}
      execute.each do |row|
        hash[row['date']] = row.except('date')
      end
      hash
    end

    def execute
      ActiveRecord::Base.connection.execute(to_sql)
    end

    def daterange
      "daterange('#{availability_request.date_start}', '#{availability_request.date_end}', '[]')"
    end

    def intersection
      "(avail_at * #{daterange})::daterange"
    end

    def length_sql
      "upper(avail_at) - lower(#{intersection})"
    end

    def to_sql
      <<-SQL
        SELECT
          occupied_date as date,
          occupiable,
          arrivable
        FROM (#{arrival_sql}) arrival
        RIGHT JOIN (#{occupied_sql}) occupied
        ON arrival.arrival_date = occupied.occupied_date
      SQL
    end

    def arrival_sql
      <<-SQL
        SELECT
        generate_series(
          lower(#{intersection}),
          upper(avail_at) - INTERVAL \'#{availability_request.stay_length}\' day,
          \'1day\'::interval
        )::date arrival_date,
        count(*) AS arrivable
        FROM availabilities
        WHERE
          site_id IN(#{site_ids}) AND
          #{length_sql} >= #{availability_request.stay_length}
        GROUP BY
          1
        ORDER BY
          1
      SQL
    end

    def occupied_sql
      <<-SQL
        SELECT
        generate_series(
          lower(#{intersection}),
          upper(avail_at),
          \'1day\'::interval
        )::date occupied_date,
        TRUE AS occupiable
        FROM availabilities
        WHERE
          site_id IN(#{site_ids}) AND
          #{length_sql} >= #{availability_request.stay_length}
        GROUP BY
          1
        ORDER BY
          1

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


__END__

SELECT
  occupied.avail,
  occupied.occupied,
  arrival.count
FROM (
  SELECT
    generate_series(lower((avail_at * daterange('2021-03-01', '2021-03-31', '[]'))::daterange), upper(avail_at) - INTERVAL '7' day, '1day'::interval)::date avail,
    count(*)
  FROM
    availabilities
  WHERE
    site_id IN(245684, 245681, 245680, 245678, 245676, 245675, 245666, 245665, 245661, 245658, 245656, 245654, 245652, 245647, 245644, 245642, 245640, 245638, 245631, 245629, 245625, 245622, 245618, 245615, 245613, 245609, 245605, 245600, 245599, 245595, 245592, 245587, 245586, 245583, 245580, 245576, 245574, 245570, 245569, 245566, 245565, 245561, 245556, 245552, 245550, 245549, 245545, 245543, 245537, 245536, 245534, 245531, 245530, 245532, 245538, 245539, 245544, 245548, 245558, 245559, 245564, 245567, 245573, 245578, 245579, 245585, 245593, 245596, 245597, 245598, 245610, 245619, 245620, 245623, 245637, 245626, 245628, 245630, 245632, 245635, 245639, 245645, 245649, 245650, 245651, 245655, 245674, 245662, 245663, 245667, 245670, 245671, 245679, 245683, 245685)
    AND upper(avail_at) - lower((avail_at * daterange('2021-03-01', '2021-03-31', '[]'))::daterange) >= 7
  GROUP BY
    1
  ORDER BY
    1) arrival
  RIGHT JOIN (
    SELECT
      generate_series(lower((avail_at * daterange('2021-03-01', '2021-03-31', '[]'))::daterange), upper(avail_at), '1day'::interval)::date avail,
      TRUE AS occupied
    FROM
      availabilities
    WHERE
      site_id IN(245684, 245681, 245680, 245678, 245676, 245675, 245666, 245665, 245661, 245658, 245656, 245654, 245652, 245647, 245644, 245642, 245640, 245638, 245631, 245629, 245625, 245622, 245618, 245615, 245613, 245609, 245605, 245600, 245599, 245595, 245592, 245587, 245586, 245583, 245580, 245576, 245574, 245570, 245569, 245566, 245565, 245561, 245556, 245552, 245550, 245549, 245545, 245543, 245537, 245536, 245534, 245531, 245530, 245532, 245538, 245539, 245544, 245548, 245558, 245559, 245564, 245567, 245573, 245578, 245579, 245585, 245593, 245596, 245597, 245598, 245610, 245619, 245620, 245623, 245637, 245626, 245628, 245630, 245632, 245635, 245639, 245645, 245649, 245650, 245651, 245655, 245674, 245662, 245663, 245667, 245670, 245671, 245679, 245683, 245685)
      AND upper(avail_at) - lower((avail_at * daterange('2021-03-01', '2021-03-31', '[]'))::daterange) >= 7
    GROUP BY
      1
    ORDER BY
      1) occupied ON arrival.avail = occupied.avail;
