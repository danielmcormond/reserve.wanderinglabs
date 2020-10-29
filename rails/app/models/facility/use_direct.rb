class Facility::UseDirect < Facility
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
      rcFacilityId: ext_facility_id,
      rdrUrl: agency.details['rdr'],
      startDate: scrape_start.strftime('%m/%d/%Y'),
      endDate: scrape_end.strftime('%m/%d/%Y'),
      hash: last_import_hash,
    }
  end
end
