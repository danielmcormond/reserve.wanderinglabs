class Notifiers::Web
  attr_reader :availability_request, :notification_method

  def initialize(availability_request, notification_method)
    @availability_request = availability_request
    @notification_method = notification_method
  end

  def send
    Pusher::PushNotifications.publish_to_interests(interests: Array.wrap(interests), payload: params)
  end

  def interests
    "user_#{availability_request.user_id}"
  end

  def params
    {
    web: {
      notification: {
        title: title,
        body: body,
        deep_link: "#{ENV['RESERVE_URL']}/t/#{availability_request.last_match[:short]}"
      }
    }
  }
  end

  def title
    "-- Availability Alert --\n#{availability_request.serialized[:facility][:name]}"
  end

  def body
    alert = []
    alert << "Date: #{availability_request.last_match[:avail_date]}"
    alert << "Nights: #{availability_request.last_match[:length]}"
    alert << "Site: #{availability_request.last_match[:site][:site_num]}"
    if availability_request.available_matches.count > 1
      alert << "(Plus #{availability_request.available_matches.count - 1} other options)"
    end
    alert.join("\n")
  end
end
