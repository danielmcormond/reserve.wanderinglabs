module InitialImport::Rec1
  class Agency
    def self.import
      new.import
    end

    def import
      attrs = {
        name: 'Pinellas County (Rec1)',
        details: {
          url: 'https://secure.rec1.com/FL/pinellas-county-fl',
        },
      }
      ::Agency.where(name: attrs[:name]).first_or_create(attrs)
    end
  end
end
