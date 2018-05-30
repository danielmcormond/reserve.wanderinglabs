module InitialImport::Camis
  class FacilityParse
    attr_accessor :session, :url

    def initialize(session, url)
      @session = session
      @url = '/' + url
    end

    def attrs
      {
        name: park_name,
        details: {
          name: campground_name,
          parent: state_park_name,
          slug: campground_name.to_param,
          path: url,
          facility_id: campground_id,
          state_park_id: state_park_id,
        },
      }
    end

    def parsed
      @_parsed ||= session.get(url).parser
    end

    def park_name
      [state_park_name, campground_name].join(' - ')
    end

    def state_park
      parsed.css('#MainContentPlaceHolder_LocationList > option').select { |o| o.attributes['selected'].present? }.first
    end

    def state_park_name
      state_park.text
    end

    def state_park_id
      state_park.values[1]
    end

    def campground
      parsed.css('#MainContentPlaceHolder_MapList > option').select { |o| o.attributes['selected'].present? }.first
    end

    def campground_name
      campground.text
    end

    def campground_id
      campground.values[1]
    end
  end
end
