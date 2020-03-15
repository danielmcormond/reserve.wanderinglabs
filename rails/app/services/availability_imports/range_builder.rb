module AvailabilityImports
  class RangeBuilder
    def self.to_range(dates)
      map(split(dates))
    end

    def self.split(all_dates)
      prev = all_dates[0]
      all_dates.slice_before do |e|
        prev, prev2 = e, prev
        prev2 + 1 != e
      end
    end

    def self.map(dates)
      dates.map do |cons_dates|
        "[#{cons_dates[0]}, #{cons_dates[-1]}]"
      end
    end
  end
end
