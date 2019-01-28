class ScrapeTypes::Queue
  attr_reader :facility

  def initialize(facility)
    @facility = facility
  end

  def self.publish(facility)
    new(facility).publish
  end

  def key
    facility.scraper_meta[:key] || "Scraper#{facility.class.to_s.split('::').last}"
  end

  def publish
    $redis.lpush(key, facility.scraper_details.to_json)
  end
end
