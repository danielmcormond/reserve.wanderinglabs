module InitialImport::Camis
  class FacilitySites
    attr_accessor :agency, :facility

    def initialize(facility)
      @agency = facility.agency
      @facility = facility
    end

    def import
      puts facility.name
      ext_sites.each do |ext_site_id|
        InitialImport::Camis::Sites.new(facility, ext_site_id).import(:create)
      end
      facility.cache_sites_count
      facility.populate_sites_details
      nil
    end

    def ext_sites
      return @ext_sites if @ext_sites

      path = '/api/maps/mapdatabyid'
      url = "#{agency.details['url']}#{path}"

      data = {
        "mapId": facility.ext_facility_id,
        "completedDate": '2019-01-22T16:09:54.306Z',
        "startDate": '2019-01-22T00:00:00',
        "endDate": '2019-01-23T00:00:00',
        "releasePersonalInformation": false,
        "isReserving": true,
        "getDailyAvailability": false,
        "partySize": 1,
        "filterData": '[]',
      }

      resp = HTTParty.post(
        url,
        body: JSON.dump(data),
        headers: {
          'Content-Type' => 'application/json',
        },
      )

      @ext_sites = JSON.parse(resp.body)['resourceAvailabilityMap'].keys
    end
  end
end
