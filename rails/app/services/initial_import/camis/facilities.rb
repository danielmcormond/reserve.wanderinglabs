module InitialImport::Camis
  class Facilities
    attr_accessor :agency, :facility_meta

    def initialize(agency, facility_meta)
      @agency = agency
      @facility_meta = facility_meta
    end

    def import
      puts name
      import_sections
    end

    def ext_locales
      return @ext_locales if @ext_locales

      path = '/api/maps/mapdatabyid'
      url = "#{agency.details['url']}#{path}"

      data = {
        "mapId": map_id,
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

      @ext_locales = JSON.parse(resp.body)['mapLinkLocales']
    end

    def name
      facility_meta['resourceLocationLocales']['0']
    end

    def map_id
      facility_meta['mapId']
    end

    def import_sections
      ext_locales.keys.each do |ext_locale_id|
        InitialImport::Camis::FacilitiesSection.new(
          self,
          ext_locales[ext_locale_id][0].merge(id: ext_locale_id).deep_symbolize_keys,
        ).import
      end
    end
  end
end
