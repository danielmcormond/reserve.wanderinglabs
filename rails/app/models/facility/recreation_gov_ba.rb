class Facility::RecreationGovBa < Facility
  def ext_id
    details['FacilityID'].to_i.to_s
  end

  def sub_name
    [parent_name, details['FACILITYADDRESS']&.first.try(:[], 'AddressStateCode')].join(', ')
  end

  def scraper_type
    :queue
  end

  def scraper_meta
    {
      key: 'ScraperRecreationGov',
    }
  end

  def scraper_details
    {
      name: "#{id}:#{name[0..25]}",
      facilityId: id,
      rgFacilityId: details['FacilityID'].to_i.to_s,
      startDate: scrape_start.strftime('%m/%d/%Y'),
      endDate: scrape_end.strftime('%m/%d/%Y'),
      hash: last_import_hash,
    }
  end

  def loop_from_site(site)
    site.details['Loop']&.to_s&.strip
  end
end
