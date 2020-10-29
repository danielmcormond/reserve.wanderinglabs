class Reserve::UseDirect
  attr_reader :availability_match, :site, :availability_request

  def initialize(availability_match)
    @availability_match = availability_match
    @site = availability_match.site
    @availability_request = availability_match.availability_request
  end

  def params
    {
      type: 'UseDirect',
      site_url: site_url,
      default_url: default_url,
    }
  end

  def arvdate
    availability_match.avail_date.strftime('%m/%d/%Y')
  end

  def site_url
    "https://reservecalifornia.com/CaliforniaWebHome/Facilities/MapView.aspx?map_id=#{site.facility.rc_facility_id}&map_level=Facility&nights=#{availability_request.stay_length}&arrival_date=#{arvdate}"
  end

  def default_url
    'https://www.reservecalifornia.com/CaliforniaWebHome/Default.aspx'
  end
end
