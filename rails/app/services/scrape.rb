class Scrape
  @queue = :scrape

  def self.perform
    Facility.active_facilities.all.each do |facility|
      Sns.publish(facility)
      Facilities::Checked.new(facility).mark_as
    end
  end
end
