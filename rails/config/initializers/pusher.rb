
require 'pusher/push_notifications'

Pusher::PushNotifications.configure do |config|
  puts "ENV #{ENV.keys.sort}"
  config.instance_id = ENV['BEAM_INSTANCE_ID']
  config.secret_key = ENV['BEAM_SECRET_KEY']
end
