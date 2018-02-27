PayPal::SDK.configure(
  mode: Rails.env.production? ? 'production' : 'sandbox', # TODO - live - (put keys in env)
  client_id: ENV['PAYPAL_ID'],
  client_secret: ENV['PAYPAL_SECRET'],
  ssl_options: {}
)
