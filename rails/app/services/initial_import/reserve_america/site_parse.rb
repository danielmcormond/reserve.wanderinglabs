module InitialImport::ReserveAmerica
  class SiteParse
    attr_reader :facility, :site_details
    def initialize(facility, site_details)
      @facility = facility
      @site_details = site_details
    end

    def perform
      if site_details.nil?
        puts "SITE DETAILS ARE NIL #{ext_site_id}"
        return
      end

      puts "#{site.id || 'NEW'}: #{attributes[:site_num]} // #{ext_site_id} "
      site.attributes = attributes
      site.save

      nil
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
        site_type: site_type,
        loop: site_details['Loop'].to_s.strip
      }
    end

    def ext_site_id
      site_details['SiteId']
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
