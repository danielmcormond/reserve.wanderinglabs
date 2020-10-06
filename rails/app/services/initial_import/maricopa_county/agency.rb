module InitialImport::MaricopaCounty
  class Agency
    def self.import
      new.import
    end

    def import
      attrs = {
        name: 'Maricopa County',
        details: {
          url: 'https://maricopacountyparks.org/'
        }
      }
      ::Agency.where(name: attrs[:name]).first_or_create(attrs)
    end
  end
end
