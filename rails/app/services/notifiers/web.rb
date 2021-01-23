class Notifiers::Web
  attr_reader :availability_request, :notification_method

  def initialize(availability_request, notification_method)
    @availability_request = availability_request
    @notification_method = notification_method
  end

  def send
    Pusher::PushNotifications.publish_to_interests(interests: Array.wrap(interests), payload: payload)
  end

  def interests
    "user_#{availability_request.user_id}"
  end

  def payload
    {
      web: {
        notification: {
          title: title,
          body: body,
          deep_link: "#{ENV['RESERVE_URL']}/t/#{availability_request.last_match[:short]}",
          icon: "#{ENV['RESERVE_URL']}/caravan-solid.png"
        }
      }
    }
  end

  def title
    availability_request.serialized[:facility][:name]
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


__END__

ar = AvailabilityRequest.find(149057)
nm = NotificationMethod.find(21242)
Notifiers::Web.new(ar, nm).send
