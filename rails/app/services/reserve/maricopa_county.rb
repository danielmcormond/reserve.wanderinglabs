class Reserve::MaricopaCounty
  attr_reader :availability_match, :site, :availability_request

  def initialize(availability_match)
    @availability_match = availability_match
    @site = availability_match.site
    @availability_request = availability_match.availability_request
  end

  def params
    {
      type: 'MaricopaCounty',
      site_url: site_url,
    }
  end

  def site_url
    @site.facility.details['reserve']
  end
end
