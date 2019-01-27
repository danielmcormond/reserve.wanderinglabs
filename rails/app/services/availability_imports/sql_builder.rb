class AvailabilityImports::SqlBuilder
  attr_reader :results

  def initialize(results)
    @results = results
  end

  def self.scope(results)
    new(results).scope
  end

  def scope
    Availability.where(or_sql)
  end

  private

  def or_array
    @or_array ||= results.map do |avail_date, site_ids|
      Availability.where(
        site_id: site_ids,
        avail_date: avail_date,
      ).to_sql.gsub(/.*WHERE /, '')
    end
  end

  def or_sql
    return '1=0' if or_array.empty?

    '(' + or_array.join(') OR (') + ')'
  end
end
