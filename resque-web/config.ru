# rackup config.ru

require 'thin'
require 'resque'
require 'resque/server'
require 'resque/scheduler/server'
require 'resque-job-stats/server'

Resque.redis = Redis.new(host: 'localhost', port: 6379, db: '0')

Resque::Server.use(Rack::Auth::Basic) do |user, password|
  user == "username" && password == "password"
end

run Rack::URLMap.new "/resque-web" => Resque::Server.new
