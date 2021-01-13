class ScrapeTypes::Queue
  attr_reader :facility, :site_group

  def initialize(facility, site_group = nil)
    @facility = facility
    @site_group = site_group
  end

  def self.publish(facility, site_group = nil)
    new(facility, site_group).publish
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
    if site_group
      existing.any? { |i| JSON.parse(i)['facilityId'] == facility.id && JSON.parse(i)['siteGroupId'] == site_group.id }
    else
      existing.any? { |i| JSON.parse(i)['facilityId'] == facility.id }
    end
  end

  def push
    $redis.lpush(key, (site_group || facility).scraper_details.to_json)
  end

  def existing
    $redis.lrange(key, 0, 1000)
  end
end
