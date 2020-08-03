class Facility::Goingtocamp < Facility
  def place_id; end

  def sub_name
    agency.name
  end

  def scraper_type
    :queue
  end

  def scraper_meta
    {
      key: 'ScraperGoingtocamp',
    }
  end

  def scraper_details
    {
      name: "#{id}:#{name[0..25]}",
      facilityId: id,
      mapId: ext_facility_id,
      baseUrl: agency.details['url'],
      startDate: scrape_start.strftime('%m/%d/%Y'),
      endDate: scrape_end.strftime('%m/%d/%Y'),
      hash: last_import_hash,
    }
  end
end
