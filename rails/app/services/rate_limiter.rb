class RateLimiter
  def self.report
    AvailabilityNotification.rate_limited.each do |rl|
      nm = NotificationMethod.find(rl[0])
      puts "#{rl[1]} / #{nm.notification_type} / #{nm.user.email}"
    end
  end
end
