module InitialImport::RecreationGov
  class FacilityParent
    attr_reader :facility
    def initialize(facility)
      @facility = facility
    end

    def url
      "https://www.recreation.gov/camping/watchman-campground/r/campgroundDetails.do?contractCode=NRSO&parkId=#{facility.park_id}"
    end

    def find
      r_url = url
      return if r_url.nil?
      r = HTTParty.get(r_url)
      b = r.body
      begin
        d = b.match(/facility_parent_link' title='([0-9a-zA-Z\s\.\-\&]*)'/)[1]
      rescue
        return
      end
      return unless d.present?
      puts "PARENT: #{d}"
      facility.parent_name = d
      facility.details['Parent'] = d
      facility.save
      # facility.update_attributes(booking_window: window)
      nil
    end
  end
end
