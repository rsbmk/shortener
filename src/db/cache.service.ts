import { Injectable, OnModuleInit } from '@nestjs/common';
import { RedisClientType, createClient } from 'redis';

@Injectable()
export class CacheManager implements OnModuleInit {
  client: RedisClientType;

  async onModuleInit() {
    this.client = createClient({
      url: process.env.REDIS_URL,
    });

    this.client.on('error', (err) => console.log('Redis Client Error', err));

    await this.client.connect();
  }
}
