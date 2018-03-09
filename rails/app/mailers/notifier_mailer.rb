class NotifierMailer < ApplicationMailer
  def new_availabilities(availability_request, notification_method)
    @availability_request = availability_request
    @availability_request_serialized = AvailabilityRequestSerializer.new(availability_request)
    mail(to: notification_method.param, subject: "Campsite Available: #{@availability_request.facility.name}")
  end

  def new_availability_request(availability_request, notification_method)
    @availability_request = availability_request
    @availability_request_serialized = AvailabilityRequestSerializer.new(availability_request)
    mail(to: notification_method.param, subject: "Campsite Availability Request Confirmed: #{@availability_request.facility.name}")
  end

  def paused(availability_request)
    @availability_request = availability_request
    @availability_request_serialized = AvailabilityRequestSerializer.new(availability_request)
    @user = availability_request.user
    mail(to: @user.email, subject: "Request Paused - Action Required: #{availability_request.facility.name}")
  end

  def user_token(user)
    @user = user
    mail(to: user.email, subject: 'WanderingLabs::Reserve login token')
  end

  def premium_welcome(user)
    @user = user
    mail(to: user.email, subject: 'WanderingLabs::Reserve - Premium Status Activated')
  end
end
