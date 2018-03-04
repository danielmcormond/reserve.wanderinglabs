class AvailabilityRequests::Creator
  attr_reader :params, :current_user
  def initialize(params, current_user = nil)
    Rails.logger.debug params
    @params = params
    @current_user = current_user
  end

  def object
    return @_ar if @_ar.present?
    @_ar = AvailabilityRequest.new(merged_params)
    @_ar.date_end ||= @_ar.date_start
    @_ar.cache_site_ids
    @_ar.status = :active
    @_ar
  end

  def create
    if object.save
      object.reload # so we have uuid
    else
      Rails.logger.fatal object.errors.to_json
    end
    object
  end

  def merged_params
    new_params = params.dup
    new_params.delete(:email)
    { facility: facility, user: user }.merge(new_params)
  end

  private

  def facility
    @_facility = Facility.find(params[:facility_id])
  end

  def user
    @_user ||= current_user || User.find_or_create_by(email: params[:email])
  end
end
