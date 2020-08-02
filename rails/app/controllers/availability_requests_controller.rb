class AvailabilityRequestsController < ApplicationController
  before_action :login_required, only: [:index]

  def index
    @availability_requests = current_user.availability_requests.active.includes(:facility)
    render json: @availability_requests
  end

  def inactive
    @availability_requests = current_user.availability_requests.inactive.includes(:facility)
    render json: @availability_requests
  end

  def show
    @availability_request = AvailabilityRequest.find_by_uuid(params[:id])
    render json: @availability_request
  end

  def create
    availability_request = AvailabilityRequests::Creator.new(availability_request_params, current_user).create
    render json: availability_request
  end

  def update
    availability_request = AvailabilityRequest.find_by_uuid(params[:id])
    availability_request.update_attributes(availability_request_params)
    Rails.logger.debug "Errors #{availability_request.errors.to_json}"
    render json: availability_request
  end

  def sites_count
    availability_request = AvailabilityRequests::Creator.new(availability_request_params, current_user).object
    render json: { count: availability_request.site_ids.size }
  end

  private

  def availability_request_params
    params.require(:availability_request).permit(
      :facility_id, :email, :date_start, :date_end, :stay_length, :sewer, :pullthru, :water, :min_length,
      :min_electric, :site_type, :site_premium, :ignore_ada, :canceled_found, :notify_sms, :status,
      arrival_days: [], specific_site_ids: []
    )
  end
end
