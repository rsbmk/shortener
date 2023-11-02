import { Client, createClient } from '@libsql/client';
import { Injectable, OnModuleInit } from '@nestjs/common';

type ERROR_MESSAGE_BY_ERROR_CODE = Record<
  string,
  {
    rawCode: number;
    message: string;
  }
>;

@Injectable()
export class DB implements OnModuleInit {
  client: Client = null;
  ERROR_MESSAGE_BY_ERROR_CODE: ERROR_MESSAGE_BY_ERROR_CODE = {
    SQLITE_CONSTRAINT_UNIQUE: {
      rawCode: 2067,
      message: 'Entity already exists',
    },
  };

  async onModuleInit() {
    const isProduction = process.env.NODE_ENV === 'production';
    this.client = createClient({
      url: process.env.DB_URL,
      ...(isProduction && {
        authToken: process.env.DB_TOKEN,
      }),
    });

    await this.client.batch([
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        state TINYINT NOT NULL DEFAULT 1,
        createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT DEFAULT NULL,
        deletedAt TEXT DEFAULT NULL
      )`,
      `CREATE TABLE IF NOT EXISTS sortUrl (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT NOT NULL UNIQUE,
        url TEXT NOT NULL,
        sortUrl TEXT NOT NULL,
        visits INTEGER NOT NULL DEFAULT 0,
        state TINYINT NOT NULL DEFAULT 1,
        createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT DEFAULT NULL,
        userId INTEGER NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      );`,
    ]);
  }
}
