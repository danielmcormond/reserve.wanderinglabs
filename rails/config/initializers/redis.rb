$redis = Redis.new(host: ENV['REDIS_HOST'], port: ENV['REDIS_PORT'], db: '0', password: ENV['REDIS_PASSWORD'])
