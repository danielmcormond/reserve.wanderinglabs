class Sms
  require 'twilio-ruby'

  attr_reader :availability_request, :notification_method

  def initialize(availability_request, notification_method)
    @availability_request = availability_request
    @notification_method = notification_method
  end

  def client
    @_client ||= Twilio::REST::Client.new(ENV['TWILIO_SID'], ENV['TWILIO_TOK'])
  end

  def send
    msg = client.messages.create(
      from: '+18028515095',
      to: "+#{notification_method.param}",
      body: availability_request.sms_body
    )

    puts msg.sid
  end
end
