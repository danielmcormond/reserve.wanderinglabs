class SmsCount
  require 'twilio-ruby'

  attr_reader :notification_method

  def initialize(notification_method)
    @notification_method = notification_method
  end

  def client
    @client ||= Twilio::REST::Client.new(ENV['TWILIO_SID'], ENV['TWILIO_TOK'])
  end

  def count
    return 0 if notification_method.param.nil?

    client.messages.list(params).count
  end

  def params
    {
      to: "+#{cleaned_with_prefix}",
    }
  end

  def cleaned_with_prefix
    cleaned_sms.start_with?('1') ? cleaned_sms : "1#{cleaned_sms}"
  end

  def cleaned_sms
    notification_method.param.scan(/\d+/).join('')
  end
end
