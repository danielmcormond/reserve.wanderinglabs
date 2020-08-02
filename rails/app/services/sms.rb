class Sms
  require 'twilio-ruby'
  @queue = :other

  attr_reader :availability_request, :notification_method

  def initialize(availability_request, notification_method)
    @availability_request = availability_request
    @notification_method = notification_method
  end

  def self.perform(availability_request_id, notification_method_id)
    availability_request = AvailabilityRequest.find(availability_request_id)
    notification_method = NotificationMethod.find(notification_method_id)
    new(availability_request, notification_method).send
    availability_request.user.sms_cache if nm.notification_type == :sms
  end

  def client
    @client ||= Twilio::REST::Client.new(ENV['TWILIO_SID'], ENV['TWILIO_TOK'])
  end

  def send
    client.messages.create(params)
  end

  def params
    {
      from: '+18028515095',
      to: "+#{cleaned_with_prefix}",
      body: availability_request.sms_body,
    }
  end

  def cleaned_with_prefix
    cleaned_sms.start_with?('1') ? cleaned_sms : "1#{cleaned_sms}"
  end

  def cleaned_sms
    notification_method.param.scan(/\d+/).join('')
  end
end
