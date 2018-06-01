class Facility::Camis < Facility
  def place_id

  end

  def sub_name
    agency.name
  end

  def sns_scraper
    ENV['AWS_SNS_SCRAPER_CAMIS']
  end

  def scraper_details
    {
      facilityId: id,
      baseUrl: agency.details['url'],
      path: details['path'],
      concurrency: 4,
      hash: last_import_hash,
    }
  end
end
