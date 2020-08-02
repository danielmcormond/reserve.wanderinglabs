# rackup config.ru

require 'thin'
require 'resque'
require 'resque/server'
require 'resque/scheduler/server'

Resque.redis = Redis.new(host: ENV['REDIS_HOST'], port: ENV['REDIS_PORT'], db: '0', password: ENV['REDIS_PASSWORD'])

puts Resque.redis.keys

run Rack::URLMap.new \
     "/" => Resque::Server.new
