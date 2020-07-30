module InitialImport::Goingtocamp
  class Agency
    def self.import
      new.import
    end

    def import
      attrs = {
        name: 'Washington State Parks (Goingtocamp)',
        details: {
          url: 'https://washington.goingtocamp.com/api/maps/mapdatabyid',
          map_id: '-2147483335'
        },
      }
      ::Agency.where(name: attrs[:name]).first_or_create(attrs)
    end
  end
end
