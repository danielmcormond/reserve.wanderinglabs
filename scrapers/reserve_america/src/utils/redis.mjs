import redis from 'redis';
import { promisify } from 'util';

const redisOptions = {
  host: process.env.REDIS_HOST,
  db: process.env.REDIS_DB,
  // prefix: 'marketingAuction:',
};
const client = redis.createClient(redisOptions);

export const redisBlpopAsync = promisify(client.blpop).bind(client);
export const redisGetAsync = promisify(client.get).bind(client);
export const redisLpushAsync = promisify(client.lpush).bind(client);
export const redisLrangeAsync = promisify(client.lrange).bind(client);
export const redisSetAsync = promisify(client.set).bind(client);
