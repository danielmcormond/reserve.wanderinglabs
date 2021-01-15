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
      default_url: default_url
    }
  end

  def arvdate
    availability_match.avail_date.strftime('%m/%d/%Y')
  end

  def site_url
    default_url
    # "#{facility.agency.details['url']}/Facilities/MapView.aspx?map_id=#{facility.ext_facility_id}&map_level=Facility&nights=#{availability_request.stay_length}&arrival_date=#{arvdate}"
  end

  def default_url
    "#{facility.agency.details['url']}/Facilities/SearchViewUnitAvailabity.aspx?map_id=#{facility.ext_facility_id}&facility_id=#{site.site_group.ext_id}&waitlist_id=00001&nights=#{availability_request.stay_length}&available_Date=#{arvdate}%2012:00:00%20AM"
  end

  def facility
    @facility ||= site.facility
  end
end
