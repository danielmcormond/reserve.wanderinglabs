module InitialImport::ReserveCalifornia
  class SiteJson
    attr_reader :facility, :ext_site_id
    def initialize(facility, ext_site_id)
      @facility = facility
      @ext_site_id = ext_site_id
    end

    def perform
      puts "\n#{site_id}\n"
      if meta.nil?
        puts "SITE DETAILS ARE NIL #{ext_site_id}"
        return
      end

      site.attributes = attributes
      site.save

      # facility.cache_sites_count
      # facility.populate_sites_details
      nil
    end

    def url
      "https://calirdr.usedirect.com/rdr/rdr/search/details/#{ext_site_id}/startdate/2020-09-22"
    end

    def body
      @body ||= JSON.parse(HTTParty.get(url).body)
    end

    def site
      @site ||= ::Site.where(facility_id: facility.id, ext_site_id: ext_site_id).first || ::Site.new(facility_id: facility.id, ext_site_id: ext_site_id)
    end

    def meta
      body
    end

    def attributes
      {
        facility_id: facility.id,
        ext_site_id: ext_site_id,
        site_num: body['Unit']['ShortName'],
        details: meta,
        water: water,
        sewer: sewer,
        electric: electric,
        length: pad_length,
        site_type: site_type,
        site_layout: site_layout,
        premium: premium,
        ada: ada
      }
    end

    def water
      body['Amenities'].key?('92.Water Hookup') && body['Amenities']['92.Water Hookup']['Value'] == 'Yes'
    end

    def sewer
      body['Amenities'].key?('72.Sewer Hookup') && body['Amenities']['72.Sewer Hookup']['Value'] == 'Yes'
    end

    def electric
      return 50 if body['Amenities']['24.Electricity Hookup'].include?('50')
      return 30 if body['Amenities']['24.Electricity Hookup'].include?('30')
    end

    def pad_length
      body['Unit']['VehicleLength'] || body['Amenities']['60.Pad Length']['Value']
    end

    def site_type
      return 'rv' if body['Unit']['IsRVSite'] == true
      return 'tent' if body['Unit']['IsTentSite'] == true

      puts 'OTHER site_type'
      'other'
    end

    def site_layout
      return 'back_in' if body['PullInTypeName'] == 'Back In'

      puts "LAYOUT #{body['PullInTypeName']}"
      'other'
    end

    def premium
      body['Amenities']['26.Feature Filter']['Value'] == 'Premium'
    end

    def ada
      body['Unit']['IsADA'] == true
    end
  end
end
