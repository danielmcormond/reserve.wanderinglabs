class ReserveUrl
  attr_reader :availability_match, :site, :availability_request

  def initialize(availability_match)
    @availability_match = availability_match
    @site = availability_match.site
    @availability_request = availability_match.availability_request
  end

  def url
    if site.facility.is_a?(Facility::ReserveCalifornia)
      reserve_california
    elsif site.facility.is_a?(Facility::RecreationGov)
      recreation_gov
    else
      reserve_america
    end
  end

  def reserve_california
    arvdate = availability_match.avail_date.strftime('%m/%d/%Y')
    "https://www.reservecalifornia.com/CaliforniaWebHome/Facilities/UnitDetailPopup.aspx?facility_id=#{site.facility.rc_facility_id}&unit_id=#{site.ext_site_id}&arrival_date=#{arvdate}%2012:00:00%20AM&is_available=True"
  end

  def reserve_america

  end

  def recreation_gov
    arvdate = availability_match.avail_date.strftime('%m/%d/%Y')
    "https://www.recreation.gov/camping/Watchman_Campground/r/campsiteDetails.do?siteId=#{site.ext_site_id}&contractCode=NRSO&parkId=#{site.facility.details['LegacyFacilityID'].to_i}&offset=0&arvdate=#{arvdate}&lengthOfStay=#{availability_request.stay_length}"
  end
end
