import redis from 'redis';
import { promisify } from 'util';

const redisOptions = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  db: process.env.REDIS_DB,
};
const client = redis.createClient(redisOptions);

export const redisBlpopAsync = promisify(client.blpop).bind(client);
export const redisBrpopAsync = promisify(client.brpop).bind(client);
export const redisGetAsync = promisify(client.get).bind(client);
export const redisLpushAsync = promisify(client.lpush).bind(client);
export const redisLrangeAsync = promisify(client.lrange).bind(client);
export const redisSetAsync = promisify(client.set).bind(client);
