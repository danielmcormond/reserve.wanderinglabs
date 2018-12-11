class ScrapeTypes::Queue
  attr_reader :facility

  def initialize(facility)
    @facility = facility
  end

  def publish
    $redis.lpush('ReserveAmerica', facility.scraper_details.to_json)
  end
end
