class Facility::RecreationGov < Facility
  def contract_code
    'NRSO'
  end

  def park_id
    details['LegacyFacilityID'].to_i.to_s
  end

  def sub_name
    [details['Parent'], details['AddressStateCode']].join(', ')
  end

  def sns_scraper
    ENV['AWS_SNS_SCRAPER']
  end

  def scraper_details
    {
      facilityId: id,
      contractCode: contract_code,
      parkId: park_id,
      startDate: scrape_start.strftime('%m/%d/%Y'),
      endDate: scrape_end.strftime('%m/%d/%Y'),
      hash: last_import_hash,
    }
  end
end
