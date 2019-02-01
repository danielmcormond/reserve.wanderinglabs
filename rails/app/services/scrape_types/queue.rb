class ScrapeTypes::Queue
  attr_reader :facility

  def initialize(facility)
    @facility = facility
  end

  def self.publish(facility)
    new(facility).publish
  end

  def key
    facility.scraper_meta[:key] ||
      "Scraper#{facility.class.to_s.split('::').last}"
  end

  def publish
    return if exists?

    push
  end

  def exists?
    existing.any? { |i| JSON.parse(i)['facilityId'] == facility.id }
  end

  def push
    $redis.lpush(key, facility.scraper_details.to_json)
  end

  def existing
    $redis.lrange(key, 0, 1000)
  end
end
