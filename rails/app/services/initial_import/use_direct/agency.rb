module InitialImport::UseDirect
  class Agency
    def self.ohio
      attrs = {
        name: 'Ohio State Parks (UseDirect)',
        details: {
          url: 'https://ohiocamp.usedirect.com/OhioCampWeb',
          rdr: 'https://ohiordr.usedirect.com/Ohiordr'
        }
      }
      ::Agency.where(name: attrs[:name]).first_or_create(attrs)
    end

    def self.alabama
      attrs = {
        name: 'Alabama State Parks (UseDirect)',
        details: {
          url: 'https://www.reservealapark.com/AlabamaWebHome',
          rdr: 'https://alabamardr.usedirect.com/AlabamaRDR',
          facility_ids: [6, 9, 5, 15, 17, 12, 13, 14, 4, 16, 2, 3, 8, 10, 11, 19, 21]
        }
      }
      ::Agency.where(name: attrs[:name]).first_or_create(attrs)
    end
  end
end
