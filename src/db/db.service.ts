import { Client, createClient } from '@libsql/client';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class DB implements OnModuleInit {
  client: Client = null;

  async onModuleInit() {
    const isProduction = process.env.NODE_ENV === 'production';
    this.client = createClient({
      url: process.env.DB_URL,
      ...(isProduction && {
        authToken: process.env.DB_TOKEN,
      }),
    });

    this.client.execute(`
      CREATE TABLE IF NOT EXISTS sortUrl (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT NOT NULL UNIQUE,
        url TEXT NOT NULL,
        sortUrl TEXT NOT NULL,
        visits INTEGER NOT NULL DEFAULT 0,
        createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT DEFAULT NULL
      )
    `);
  }
}
