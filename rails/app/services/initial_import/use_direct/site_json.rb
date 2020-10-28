module InitialImport::UseDirect
  class SiteJson
    attr_reader :facility, :ext_site_id
    def initialize(facility, ext_site_id)
      @facility = facility
      @ext_site_id = ext_site_id
    end

    def perform
      puts "\n#{ext_site_id}\n"
      if meta.nil?
        puts "SITE DETAILS ARE NIL #{ext_site_id}"
        return
      end

      site.attributes = attributes
      site.save
      nil
    end

    def url
      facility.agency.details["rdr"] + "/rdr/search/details/#{ext_site_id}/startdate/2020-09-22"
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
      amenities('Water Hookup') == 'Yes'
    end

    def sewer
      amenities('Sewer Hookup') == 'Yes'
    end

    def electric
      return 50 if Array.wrap(amenities('Electricity Hookup')).include?('50')
      return 30 if Array.wrap(amenities('Electricity Hookup')).include?('30')
    end

    def pad_length
      amenities('Pad Length')&.to_i || amenities('Pad Size')&.to_i
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
      amenities('Feature Filter') == 'Premium'
    end

    def ada
      body['Unit']['IsADA'] == true
    end

    def amenities(match)
      found_amenities = (body.dig('Amenities') || {}).find { |k, _v| k.include?(match) }
      return unless found_amenities

      found_amenities[1].dig('Value') || found_amenities[1].dig('Values')
    end
  end
end
