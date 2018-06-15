class Facility::Camis < Facility
  def place_id

  end

  def sub_name
    agency.name
  end

  def scraper_type
    :container
  end

  def scraper_meta
    {
      url: ENV['AWS_SCRAPER_CONTAINER_CAMIS']
    }
  end

  def scraper_details
    {
      facilityId: id,
      baseUrl: agency.details['url'],
      path: details['path'],
      concurrency: 2,
      hash: last_import_hash,
    }
  end
end
