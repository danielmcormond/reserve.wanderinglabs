class AvailabilityNotificationsController < ApplicationController
  def index
    availability_request = AvailabilityRequest.find_by_uuid(params[:availability_request_id])
    @availability_notifications = availability_request.availability_notifications.where(throttled: false).limit(100)
    render json: @availability_notifications
  end
end
