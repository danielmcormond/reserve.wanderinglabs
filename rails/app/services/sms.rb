class Sms
  require 'twilio-ruby'

  attr_reader :availability_request, :notification_method

  def initialize(availability_request, notification_method)
    @availability_request = availability_request
    @notification_method = notification_method
  end

  def self.send(availability_request, notification_method)
    new(availability_request, notification_method).send
  end

  def client
    @_client ||= Twilio::REST::Client.new(ENV['TWILIO_SID'], ENV['TWILIO_TOK'])
  end

  def send
    msg = client.messages.create(params)
    puts msg.sid
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
