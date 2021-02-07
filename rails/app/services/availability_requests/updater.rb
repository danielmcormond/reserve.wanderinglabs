class AvailabilityRequests::Updater
  attr_reader :uuid, :params, :current_user
  def initialize(uuid, params, current_user = nil)
    @uuid = uuid
    @params = params
    @current_user = current_user
  end

  def object
    @object ||= AvailabilityRequest.find_by_uuid(uuid)
  end

  def update
    object.attributes = merged_params
    object.date_end ||= object.date_start
    object.cache_site_ids
    object.status = :active unless merged_params[:status]

    if object.save
      # object.reload # so we have uuid
      # object.availability_matcher # initial run
    else
      Rails.logger.fatal object.errors.to_json
    end
    object
  end

  def merged_params
    new_params = params.dup
    new_params.delete(:user)
    new_params.delete(:user_id)
    new_params.delete(:email)
    new_params
  end
end
