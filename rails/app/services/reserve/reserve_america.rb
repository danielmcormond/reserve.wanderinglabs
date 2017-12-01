class Reserve::ReserveAmerica
  attr_reader :availability_match, :site, :availability_request

  def initialize(availability_match)
    @availability_match = availability_match
    @site = availability_match.site
    @availability_request = availability_match.availability_request
  end

  def params
    {
      type: 'ReserveAmerica',
      site_url: site_url,
    }
  end

  def site_url
    arvdate = availability_match.avail_date.strftime('%m/%d/%Y')
    "https://www.reserveamerica.com/camping/#{site.facility.details['slug']}/r/campsiteDetails.do?siteId=#{site.ext_site_id}&contractCode=#{site.facility.details['contract_code']}&parkId=#{site.facility.details['park_id']}&offset=0&arvdate=#{arvdate}&lengthOfStay=#{availability_request.stay_length}"
  end
end
