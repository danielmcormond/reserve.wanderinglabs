# rackup config.ru

require 'thin'
require 'resque'
require 'resque/server'
require 'resque/scheduler/server'
require 'resque-job-stats/server'

Resque.redis = Redis.new(host: 'localhost', port: 6379, db: '0')

module AvailabilityImports
  class Index
    extend Resque::Plugins::JobStats
  end
end

module AvailabilityMatcher
  class Index
    extend Resque::Plugins::JobStats
  end
end

Resque::Server.use(Rack::Auth::Basic) do |user, password|
  user == "username" && password == "password"
end

run Rack::URLMap.new "/resque-web" => Resque::Server.new
