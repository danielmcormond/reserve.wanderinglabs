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
    arvdate = availability_match.avail_date.strftime('%Y-%m-%d')
    "https://www.reserveamerica.com/explore/#{site.facility.details['slug']}/#{site.facility.details['state']}/#{site.facility.details['park_id']}/#{site.ext_site_id}/campsite-booking?availStartDate=#{arvdate}&arrivalDate=#{arvdate}&lengthOfStay=#{availability_request.stay_length}&nextAvailableDate=false&dynamicUpdate=true"
  end
end
