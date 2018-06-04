class ScrapeTypes::Container
  attr_reader :facility
  require 'httparty'

  def initialize(facility)
    @facility = facility
  end

  def publish
    HTTParty.post(
      facility.scraper_meta[:url],
      body: facility.scraper_details.to_json,
      headers: { 'Content-Type' => 'application/json' }
    )
  end
end
