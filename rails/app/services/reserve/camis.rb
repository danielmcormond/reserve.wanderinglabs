class Reserve::Camis
  attr_reader :availability_match, :site, :availability_request

  def initialize(availability_match)
    @availability_match = availability_match
    @site = availability_match.site
    @availability_request = availability_match.availability_request
  end

  def params
    {
      type: 'Camis',
      site_url: site_url,
    }
  end

  def query_params
    {
      mapId: site.facility.ext_facility_id,
      searchTabGroupId: 0,
      bookingCategoryId: 0,
      startDate: availability_request.date_start,
      endDate: availability_request.date_start + availability_request.stay_length,
      nights: availability_request.stay_length,
      selectedView: 'map',
    }
  end

  def site_url
    "#{site.facility.agency.details['url']}/create-booking/results?#{query_params.to_query}"
  end
end
