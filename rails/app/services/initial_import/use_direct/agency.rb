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
  end
end
