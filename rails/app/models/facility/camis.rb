class Facility::Camis < Facility
  def place_id; end

  def sub_name
    agency.name
  end

  def scraper_type
    :queue
  end

  def scraper_meta
    {
      url: ENV['AWS_SCRAPER_CONTAINER_CAMIS'],
    }
  end

  def scraper_details
    {
      name: "#{id}:#{name[0..25]}",
      facilityId: id,
      baseUrl: agency.details['url'],
      mapId: ext_facility_id,
      startDate: scrape_start.strftime('%m/%d/%Y'),
      endDate: scrape_end.strftime('%m/%d/%Y'),
      hash: last_import_hash,
    }
  end
end
