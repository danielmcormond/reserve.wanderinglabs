class Scrape
  @queue = :scrape

  def self.perform
    limit = (Facility.active_facilities.count.keys.size / 10.to_f).round
    Facility.active_facilities.order('last_scrape_attempt ASC NULLS FIRST').limit(limit).all.each do |facility|
      Sns.publish(facility)
      Facilities::Checked.new(facility).mark_as
    end
  end
end
