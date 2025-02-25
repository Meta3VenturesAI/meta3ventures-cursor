import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: import.meta.env.REDIS_URL || '',
  token: import.meta.env.REDIS_TOKEN || ''
});

export interface RateLimitConfig {
  max: number;
  window: number; // in seconds
}

export const rateLimit = async (
  ip: string,
  endpoint: string,
  config: RateLimitConfig
) => {
  const key = `rate-limit:${ip}:${endpoint}`;
  const now = Date.now();
  const windowStart = now - (config.window * 1000);

  // Add current request timestamp and remove old ones
  await redis.zAdd(key, { score: now, member: now.toString() });
  await redis.zRemRangeByScore(key, 0, windowStart);

  // Count requests in current window
  const count = await redis.zCard(key);
  
  // Set key expiration
  await redis.expire(key, config.window);

  return count <= config.max;
}; 