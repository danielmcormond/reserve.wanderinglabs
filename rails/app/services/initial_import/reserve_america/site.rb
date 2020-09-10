module InitialImport::ReserveAmerica
  class Site
    attr_reader :facility, :ext_site_id
    def initialize(facility, ext_site_id)
      @facility = facility
      @ext_site_id = ext_site_id
    end

    def perform
      if site_details.nil?
        puts "SITE DETAILS ARE NIL #{ext_site_id}"
        return
      end

      site.attributes = attributes
      site.save

      facility.cache_sites_count
      facility.populate_sites_details
      nil
    end

    def url
      "https://www.reserveamerica.com/campsiteSearch.do?contractCode=#{facility.details['contract_code']}&parkId=#{facility.park_id}&xml=true"
    end

    def body
      @body ||= Hash.from_xml(HTTParty.get(url).body)
    end

    def site_details
      Array.wrap(body['resultset']['result']).find { |set| set['SiteId'] == ext_site_id }
    end

    def site
      @site ||= ::Site.where(facility_id: facility.id, ext_site_id: ext_site_id).first || ::Site.new(facility_id: facility.id, ext_site_id: ext_site_id)
    end

    def attributes
      {
        site_num: site_details['Site'],
        details: site_details,
        water: site_details['sitesWithWaterHookup'] == 'Y',
        sewer: site_details['sitesWithSewerHookup'] == 'Y',
        electric: site_details['sitesWithAmps'].blank? ? nil : site_details['sitesWithAmps'].to_i,
        length: site_details['Maxeqplen'].blank? ? nil : site_details['Maxeqplen'].to_i,
        site_type: site_type
      }
    end

    def site_type
      if site_details['SiteType'].include?('GROUP')
        :group
      elsif site_details['SiteType'].include?('WALK')
        :tent_walk_in
      elsif site_details['SiteType'].include?('Tent Only')
        :tent
      elsif site_details['SiteType'].include?('TENT SITE')
        :tent
      elsif site_details['Maxeqplen'].blank? || site_details['Maxeqplen'].to_i.zero?
        :other
      else
        :rv
      end
    end
  end
end
