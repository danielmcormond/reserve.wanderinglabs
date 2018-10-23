class Facility::RecreationGovBa < Facility
  def ext_id
    details['FacilityID'].to_i.to_s
  end

  def sub_name
    [parent_name, details['FACILITYADDRESS']&.first.try(:[], 'AddressStateCode')].join(', ')
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
      rgFacilityId: details['FacilityID'].to_i.to_s,
      startDate: scrape_start.strftime('%m/%d/%Y'),
      endDate: scrape_end.strftime('%m/%d/%Y'),
      hash: last_import_hash,
    }
  end
end
