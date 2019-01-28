class ReserveUrl
  attr_reader :availability_match

  def initialize(availability_match)
    @availability_match = availability_match
  end

  def params
    if availability_match.site.facility.is_a?(Facility::ReserveCalifornia)
      Reserve::ReserveCalifornia.new(availability_match).params
    elsif availability_match.site.facility.is_a?(Facility::RecreationGov)
      Reserve::RecreationGov.new(availability_match).params
    elsif availability_match.site.facility.is_a?(Facility::RecreationGovBa)
      Reserve::RecreationGovBa.new(availability_match).params
    elsif availability_match.site.facility.is_a?(Facility::Camis)
      Reserve::Camis.new(availability_match).params
    elsif availability_match.site.facility.is_a?(Facility::PinellasCounty)
      Reserve::PinellasCounty.new(availability_match).params
    else
      Reserve::ReserveAmerica.new(availability_match).params
    end
  end

  def recreation_gov
    arvdate = availability_match.avail_date.strftime('%m/%d/%Y')
    "https://www.recreation.gov/camping/Watchman_Campground/r/campsiteDetails.do?siteId=#{site.ext_site_id}&contractCode=NRSO&parkId=#{site.facility.details['LegacyFacilityID'].to_i}&offset=0&arvdate=#{arvdate}&lengthOfStay=#{availability_request.stay_length}"
  end
end
