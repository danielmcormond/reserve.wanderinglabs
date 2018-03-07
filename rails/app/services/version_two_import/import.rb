module VersionTwoImport
  class Import
    attr_reader :params
    def initialize(params)
      @params = if params.is_a?(String)
                  eval(params)
                else
                  params
                end
    end

    def attributes
      {
        uuid: uuid,
        imported: true,
        import_details: params,
        facility_id: facility.id,

        site_type: site_type,
        stay_length: stay_length,
        date_start: date_start,
        date_end: adjusted_date_end,

        water: water,
        sewer: sewer,
        min_electric: electric.positive? ? electric : nil,
        min_length: min_length,

        checked_count: params[:checkedCount][:n].to_i,
        checked_at: checked_at,
      }
    end

    def create
      unless import?
        puts 'Skipping.. '
        return
      end

      unless valid?
        puts 'invalid..'
        return
      end

      AvailabilityRequests::Creator.new(attributes, user).create
    end

    def valid?
      errors = []
      errors << 'No Facility' if facility.nil?
      errors << 'Exists' if exists?
      errors << 'Premium Mismatch' if premium && !user.premium?

      puts errors.join("\n") unless errors.empty?
      errors.empty?
    end

    def import?
      active? && park_id == '281005'
    end

    def active?
      status == :active
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
      @_facility ||= Facility::ReserveAmerica.where('details @> ?', { park_id: park_id }.to_json).first
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
      params[:premium][:bOOL]
    end

    def date_start
      Time.at(params[:dateStart][:n].to_i).utc
    end

    def date_end
      Time.at(params[:dateEnd][:n].to_i).utc
    end

    def checked_at
      Time.at(params[:checkedAt][:n].to_i).utc
    end

    def adjusted_date_end
      adjusted = date_end - stay_length.days
      puts "#{date_start}-#{date_end} :: #{stay_length} :: #{adjusted}"
      adjusted
    end
  end
end
