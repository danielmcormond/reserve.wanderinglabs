class Facility::ReserveAmerica < Facility
  def contract_code
    details['contract_code']
  end

  def park_id
    details['park_id']
  end

  def sub_name
    [agency.name, details['state']].join(', ')
  end

  def sns_scraper
    ENV['AWS_SNS_SCRAPER']
  end

  def scraper_type
    :queue
  end

  def scraper_details
    {
      name: "#{id}:#{name[0..25]}",
      facilityId: id,
      contractCode: contract_code,
      parkId: park_id,
      startDate: scrape_start.strftime('%m/%d/%Y'),
      endDate: scrape_end.strftime('%m/%d/%Y'),
      hash: last_import_hash,
      numSites: sites_count
    }
  end

  def loop_from_site(site)
    site.details['Loop'].trim
  end
end
