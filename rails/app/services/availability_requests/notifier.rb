module AvailabilityRequests
  class Notifier
    attr_reader :availability_request

    def initialize(availability_request)
      @availability_request = availability_request
    end

    def needed?
      availability_request.notify? &&
        availability_request.user.present? &&
        availability_request.availability_matches.available.notifiable.count.positive?
    end

    def notify
      return unless needed?

      notifications = availability_request.user.notification_methods.where(active: true).map do |nm|
        next if nm.notification_type.sms? && !availability_request.notify_sms

        notify_for(nm) if nm.allow?
        log_notify(nm)
      end
      mark_notified
      notifications
    end

    private

    def mark_notified
      availability_request.availability_matches.available.notifiable.update_all(notified_at: Time.now)
    end

    def notify_for(nm)
      if nm.notification_type.sms?
        begin
          Sms.send(availability_request, nm)
        rescue Twilio::REST::RestError => e
          Rails.logger.fatal(e)
        end
      elsif nm.notification_type.web?
        Notifiers::Web.new(availability_request, nm).send
      else
        NotifierMailer.new_availabilities(availability_request, nm).deliver
      end
    end

    def log_notify(nm)
      ln = availability_request.availability_notifications.create(
        notification_method: nm,
        throttled: !nm.allow?,
        matches: availability_request.available_matches.count,
        matches_new: availability_request.available_matches.where(notified_at: nil).count,
      )
      availability_request.user.sms_cache if nm.notification_type.sms?
      availability_request.user.web_cache if nm.notification_type.web?
      ::NewRelic::Agent.increment_metric("Custom/Notification/#{nm.allow? ? 'Live' : 'Throttled'}/#{nm.notification_type}")
      ln
    end
  end
end
