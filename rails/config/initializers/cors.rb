# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin AJAX requests.

# Read more: https://github.com/cyu/rack-cors

# Rails.application.config.middleware.insert_before 0, Rack::Cors do
#   allow do
#     origins 'example.com'
#
#     resource '*',
#       headers: :any,
#       methods: [:get, :post, :put, :patch, :delete, :options, :head]
#   end
# end
Rails.application.config.middleware.insert_before 0, Rack::Cors, debug: true, logger: (-> { Rails.logger }) do
  allow do
    origins 'localhost:3000','localhost:3001', 'reserve-beta.wanderinglabs.com.s3-website-us-east-1.amazonaws.com', 'reserve-beta.wanderinglabs.com', 'reserve.wanderinglabs.com.s3-website-us-east-1.amazonaws.com', 'reserve.wanderinglabs.com'

    resource '*',
             headers: :any,
             credentials: true,
             methods: [:get, :post, :options, :delete, :put, :patch]
  end
end
