module InitialImport::Camis
  class SiteParse
    attr_accessor :session, :facility, :site_id

    def initialize(session, facility, site_id)
      @session = session
      @facility = facility
      @site_id = site_id
    end

    def body
      @_body ||= session.site_details(site_id).body
    end

    def parsed
      @_parsed ||= Nokogiri::HTML(body)
    end

    def details
      {
        facility_id: facility.id,
        ext_site_id: site_id,
        site_num: site_num,
        details: amenities,
        water: amenities['service_type']&.downcase&.include?('water') || false,
        sewer: amenities['service_type']&.downcase&.include?('sewer') || false,
        electric: electricity_hookup.positive? ? electricity_hookup : nil,
        length: site_length,
        site_type: site_type,
        site_layout: site_layout_clean,
        premium: amenities['premium_status_site']&.downcase&.include?('y') || false,
      }
    end

    def site_num
      parsed.css('.popupheading').first.text.split('-')[0].gsub('Site', '').strip
    end

    def site_length
      amenities['site_length'].to_i
    end

    def electricity_hookup
      amenities['electrical_service']&.to_i || 0
    end

    def dpr_site_type
      amenities['allowed_equipment'] || ''
    end

    def site_type
      puts "#{site_num}: #{amenities['site_type']} / #{amenities['pad_location']} / #{amenities['allowed_equipment']}"
      if dpr_site_type.include?('Van/Camper')
        :rv
      elsif dpr_site_type.include?('Tent/Shelter')
        :tent
      elsif amenities['site_type'].include?('Day')
        :other
      elsif amenities['site_type'].include?('Cabin')
        :other
      elsif amenities['site_type'].include?('Marina')
        :other
      elsif amenities['site_type'].include?('Group')
        :group
      else
        puts "UNKNOWN SITE TYPE #{site_num}: #{amenities['site_type']} / #{amenities['pad_location']} / #{amenities['allowed_equipment']}"
        :other
      end
    end

    def site_layout
      amenities['pad_location']&.downcase || ''
    end

    def site_layout_clean
      if site_layout.include?('back')
        :back_in
      elsif site_layout.include?('pull')
        :pull_thru
      elsif site_layout.include?('head')
        :head_in
      else
        puts "UNKNOWN LAYOUT #{site_num}: #{amenities['site_type']} / #{amenities['pad_location']} / #{amenities['allowed_equipment']}"
        :other
      end
    end

    def amenities
      parsed.css('tr').map { |li| [li.children[0]&.text&.strip&.parameterize&.underscore, li.children[1]&.text&.strip] }.to_h
    end
  end
end
