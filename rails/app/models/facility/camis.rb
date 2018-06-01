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
      rcFacilityId: rc_facility_id,
      rcPlaceId: place_id,
      hash: last_import_hash,
    }
  end
end
