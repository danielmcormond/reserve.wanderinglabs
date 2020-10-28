class Facility::UseDirect < Facility
  def place_id
    details['place_id']
  end

  def rc_facility_id
    details['facility_id']
  end

  def sub_name
    'UseDirect'
  end

  def scraper_type
    :queue
  end

  def scraper_meta
    {
      key: 'ScraperUseDirect',
    }
  end

  def scraper_details
    {
      name: "#{id}:#{name[0..25]}",
      facilityId: id,
      rcFacilityId: rc_facility_id,
      rcPlaceId: place_id,
      rcName: details['parent'],
      startDate: scrape_start.strftime('%m/%d/%Y'),
      endDate: scrape_end.strftime('%m/%d/%Y'),
      hash: last_import_hash,
    }
  end
end
