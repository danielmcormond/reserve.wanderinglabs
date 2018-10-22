class Reserve::RecreationGovBa
  attr_reader :availability_match, :site, :availability_request

  def initialize(availability_match)
    @availability_match = availability_match
    @site = availability_match.site
    @availability_request = availability_match.availability_request
  end

  def params
    {
      type: 'RecreationGovBa',
      site_url: site_url,
    }
  end

  def site_url
    "https://www.recreation.gov/camping/campgrounds/#{site.facility.ext_id}/campsites"
  end
end
