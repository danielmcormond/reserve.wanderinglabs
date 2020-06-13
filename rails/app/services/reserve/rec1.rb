class Reserve::Rec1
  attr_reader :availability_match, :site, :availability_request

  def initialize(availability_match)
    @availability_match = availability_match
    @site = availability_match.site
    @availability_request = availability_match.availability_request
  end

  def params
    {
      type: 'Rec1',
      site_url: site_url,
    }
  end

  def site_url
    "https://secure.rec1.com/FL/pinellas-county-fl/catalog/index"
  end
end
