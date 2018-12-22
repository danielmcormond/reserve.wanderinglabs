# https://public.co.pinellas.fl.us/parks/ItemAttributeResults.jsp?riName=200

module InitialImport::PinellasCounty
  class Sites
    attr_reader :facility, :site_id
    def initialize(facility, site_id)
      @facility = facility
      @site_id = site_id
    end

    def self.import(facility, reset = false)
      delete_all(facility) if reset

      (1..236).each do |site_id|
        new(facility, site_id).import
      end
    end

    def self.delete_all(facility)
      facility.sites.delete_all
    end

    def url
      "https://public.co.pinellas.fl.us/parks/ItemAttributeResults.jsp?riName=#{site_id}"
    end

    def body
      @body ||= HTTParty.get(url).body
    end

    def parsed
      @parsed ||= Nokogiri::HTML(body)
    end

    def attrs
      parsed
        .css('.resultsbody,.resultsbodyc')
        .map { |r| r.text.strip }
        .reject { |r| ['Restrictions', 'Feature'].include?(r) }
    end

    def import
      site = facility.sites.where(ext_site_id: site_id).first
      if site
        site.update_attributes(site_attrs)
      else
        Site.create(site_attrs)
      end
      facility.cache_sites_count
      nil
    end

    def site_attrs
      {
        facility_id: facility.id,
        ext_site_id: site_id,
        site_num: site_id,
        details: attrs,
        length: length,
        site_type: site_type,
        premium: attrs.include?('WATER FRONT'),
      }
    end

    def length
      attrs.select { |a| a.include?(' x ') }.first.split('x').map(&:to_i).max
    rescue
      puts "NO LENGTH #{url} // #{attrs}"
      nil
    end

    def site_type
      if attrs.include?('TENTS ALLOWED')
        :tent
      elsif attrs.include?('ACCOMMODATES ALL CAMPING UNITS')
        :rv
      else
        puts "UNKOWN TYPE #{url} // #{attrs.join(', ')}"
        :other
      end
    end
  end
end
