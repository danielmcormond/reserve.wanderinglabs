module InitialImport::ReserveCalifornia
  class SiteParse
    attr_accessor :session, :facility, :site_id

    def initialize(session, facility, site_id)
      @session = session
      @facility = facility
      @site_id = site_id
    end

    def rc_facility_id
      facility.details['facility_id']
    end

    def body
      @_body ||= session.site(rc_facility_id, site_id).body
    end

    def parsed
      @_parsed ||= Nokogiri::HTML(body)
    end

    def details
      {
        facility_id: facility.id,
        ext_site_id: site_id,
        site_num: site_num,
        details: meta,
        water: amenities['water_hookup'].downcase.include?('y'),
        sewer: amenities['sewer_hookup'].downcase.include?('y'),
        electric: electricity_hookup.positive? ? electricity_hookup : nil,
        length: site_length,
        site_type: site_type,
        site_layout: site_layout_clean,
      }
    end

    def site_num
      parsed.css('.popup-heading').text.match(/\#(.*)/)[1]
    end

    def site_length
      return if amenities['site_length_camp_space_unit_max_length'].blank?
      amenities['site_length_camp_space_unit_max_length'].to_i
    end

    def electricity_hookup
      amenities['electricity_hookup'].scan(/\d+/).first.to_i
    end

    def dpr_site_type
      amenities['dpr_site_type'].downcase
    end

    def site_type
      if dpr_site_type.include?('group')
        :group
      elsif dpr_site_type.include?('cabin')
        :cabin
      elsif dpr_site_type.include?('tent')
        :tent
      elsif dpr_site_type.include?('hike')
        :tent_walk_in
      else
        :rv
      end
    end

    def site_layout
      left['pull_in_type'].downcase
    end

    def site_layout_clean
      if site_layout.include?('back')
        :back_in
      elsif site_layout.include?('pull')
        :pull_thru
      else
        puts "UNKNOWN LAYOUT #{site_layout}"
        :other
      end
    end

    def meta
      amenities.merge(left)
    end

    def amenities
      parsed.css('li').map { |li| [li.children[0]&.text&.strip&.parameterize&.underscore, li.css('b')[0]&.text&.strip] }.to_h
    end

    def left
      parsed.css('#divMobileunit > p').map do |p|
        [p.children[0].text.strip.parameterize.underscore, p.css('b')[0].text.strip]
      end.to_h
    end
  end
end
