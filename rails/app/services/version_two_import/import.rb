module VersionTwoImport
  class Import
    attr_reader :params, :errors
    def initialize(params)
      @params = if params.is_a?(String)
                  eval(params)
                else
                  params
                end
      @errors = []
    end

    def cleaned_params
      tmp_params = params
      tmp_params.delete(:availabilities)
      tmp_params
    end

    def attributes
      {
        uuid: uuid,
        notify: false,
        imported: true,
        import_details: cleaned_params,
        facility_id: facility.id,

        site_type: site_type,
        stay_length: stay_length,
        date_start: date_start,
        date_end: adjusted_date_end,

        water: water,
        sewer: sewer,
        min_electric: electric.positive? ? electric : nil,
        min_length: min_length,

        checked_count: params.dig(:checkedCount, :n)&.to_i,
        checked_at: checked_at,
      }
    end

    def log
      "#{status} :: #{params[:email][:s]} :: #{park_id} - #{facility&.name || params.dig(:typeSpecific, :m, :parkName, :s)} :: #{date_start.to_date}-#{date_end.to_date} :: #{uuid} :: "
    end

    def create
      unless valid?
        output("Invalid [#{errors.join(', ')}] :: #{log}") unless errors.include?('Status/Date') || errors.include?('Exists')
        return
      end

      ar = AvailabilityRequests::Creator.new(attributes, user).create
      output("Created #{ar.id} :: #{log}")
      ar
    end

    def valid?
      errors << 'Status/Date' unless import?
      errors << 'No Facility' if facility.nil?
      errors << 'Exists' if exists?
      errors << 'Premium Mismatch' if premium && !user.premium?
      errors.empty?
    end

    def import?
      active?
    end

    def active?
      (status == :active || status == :paused) && adjusted_date_end > Time.now
    end

    def exists?
      AvailabilityRequest.where(uuid: uuid).count.positive?
    end

    def uuid
      params[:id][:s]
    end

    def user
      @_user ||= User.where(email: params[:email][:s]).first || User.create(email: params[:email][:s])
    end

    def park_id
      params[:typeSpecific][:m][:parkId][:s]
    end

    def facility
      @_facility ||= if params.dig(:typeSpecific, :m, :code, :s) == 'NRSO'
                       Facility::RecreationGov.where('details @> ?', { LegacyFacilityID: "#{park_id}.0".to_f }.to_json).first
                     else
                       Facility::ReserveAmerica.where('details @> ?', { park_id: park_id }.to_json).first
                     end
    end

    def status
      params[:status][:s].to_sym
    end

    def site_type
      case params.dig(:typeSpecific, :m, :siteType, :n).to_i
      when 2001
        :rv
      when 2002
        :rv
      when 10_001
        :other
      when 2003
        :tent
      else
        :rv
      end
    end

    def stay_length
      params[:lengthOfStay][:n].to_i
    end

    def water
      params.dig(:typeSpecific, :m, :water, :bOOL)
    end

    def sewer
      params.dig(:typeSpecific, :m, :sewer, :bOOL)
    end

    def electric
      params.dig(:typeSpecific, :m, :electric, :m, :name, :s).to_i
    end

    def min_length
      params.dig(:typeSpecific, :m, :eqLen, :s).to_i
    end

    def premium
      params.dig(:premium, :bOOL)
    end

    def date_start
      Time.at(params[:dateStart][:n].to_i).utc
    end

    def date_end
      Time.at(params[:dateEnd][:n].to_i).utc
    end

    def checked_at
      params[:checkedAt] && Time.at(params[:checkedAt][:n].to_i).utc
    end

    def adjusted_date_end
      adjusted = date_end - stay_length.days
      # puts "#{date_start}-#{date_end} :: #{stay_length} :: #{adjusted}"
      adjusted
    end

    def output(txt)
      puts txt
      Rails.logger.debug txt
    end
  end
end
