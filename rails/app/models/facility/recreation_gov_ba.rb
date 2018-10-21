class Facility::RecreationGovBa < Facility
  def sub_name
    agency.name
  end

  def scraper_type
    :container
  end

  def scraper_meta
    {
      url: ENV['AWS_SCRAPER_CONTAINER_RG'],
    }
  end

  def scraper_details
    {
      facilityId: id,
      rcFacilityId: details['FacilityID'].to_i.to_s,
      startDate: scrape_start.strftime('%m/%d/%Y'),
      endDate: scrape_end.strftime('%m/%d/%Y'),
      hash: last_import_hash,
    }
  end
end
