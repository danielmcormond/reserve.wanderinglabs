module InitialImport::ReserveAmerica
  class Sites
    attr_reader :facility
    def initialize(facility)
      @facility = facility
    end

    def url
      "https://www.reserveamerica.com/campsiteSearch.do?contractCode=#{facility.details['contract_code']}&parkId=#{facility.park_id}&xml=true"
    end

    def import(reset = false)
      delete_all if reset

      puts url
      r = HTTParty.get(url)
      b = r.body
      h = Hash.from_xml(b)
      Array.wrap(h['resultset']['result']).each_with_index do |set, x|
        existing_site = facility.sites.where(ext_site_id: set['SiteId']).count.positive?
        if existing_site
          puts "Site Exists.. #{set['SiteId']} // #{set['Site']}"
          next
        end
        Site.create(
          facility_id: facility.id,
          ext_site_id: set['SiteId'],
          site_num: set['Site'],
          details: set,
          water: set['sitesWithWaterHookup'] == 'Y',
          sewer: set['sitesWithSewerHookup'] == 'Y',
          electric: set['sitesWithAmps'].blank? ? nil : set['sitesWithAmps'].to_i,
          length: set['Maxeqplen'].blank? ? nil : set['Maxeqplen'].to_i,
          site_type: site_type(set)
        )
        puts x
      end
      facility.cache_sites_count
      facility.populate_sites_details
      nil
    end

    def delete_all
      facility.sites.delete_all
    end

    def site_type(set)
      if set['SiteType'].include?('GROUP')
        :group
      elsif set['SiteType'].include?('WALK')
        :tent_walk_in
      elsif set['SiteType'].include?('Tent Only')
        :tent
      elsif set['SiteType'].include?('TENT SITE')
        :tent
      elsif set['Maxeqplen'].blank? || set['Maxeqplen'].to_i.zero?
        :other
      else
        :rv
      end
    end
  end
end
