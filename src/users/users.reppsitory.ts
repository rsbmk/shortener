import { Injectable } from '@nestjs/common';
import { DB } from 'src/db/db.service';
import { UsersModel } from './entities/user.entity';
import { CreateUsersDto } from './users.dto';

@Injectable()
export class UsersRepository {
  constructor(private db: DB) {}

  async create({ password, username }: CreateUsersDto) {
    try {
      const res = await this.db.client.execute({
        sql: 'INSERT INTO users (username, password) VALUES (:username, :password)',
        args: { username, password },
      });

      return this.findOneById(res.lastInsertRowid);
    } catch (error) {
      // TODO: sent to sentry
      throw new Error('Error to create user');
    }
  }

  async findOneByUsername(username: string): Promise<UsersModel | undefined> {
    const res = await this.db.client.execute({
      sql: 'SELECT * FROM users WHERE username = :username AND state = 1',
      args: { username },
    });

    return res.rows[0] as unknown as UsersModel | undefined;
  }

  async findOneById(id: bigint): Promise<UsersModel | undefined> {
    const res = await this.db.client.execute({
      sql: 'SELECT * FROM users WHERE id = :id AND state = 1',
      args: { id },
    });

    return res.rows[0] as unknown as UsersModel | undefined;
  }

  async updateUsername(id: number, username: string) {
    const res = await this.db.client.execute({
      sql: `UPDATE users SET username = :username, updatedAt = CURRENT_TIMESTAMP WHERE id = :id AND state = 1`,
      args: { id, username },
    });

    return res.rows[0] as unknown as UsersModel;
  }

  async updatePassword(id: number, password: string) {
    const res = await this.db.client.execute({
      sql: `UPDATE users SET password = :password, updatedAt = CURRENT_TIMESTAMP WHERE id = :id AND state = 1`,
      args: { id, password },
    });

    return res.rows[0] as unknown as UsersModel;
  }

  async remove(id: number) {
    const res = await this.db.client.execute({
      sql: `UPDATE users SET state = 0, deletedAt = CURRENT_TIMESTAMP WHERE id = :id AND state = 1`,
      args: { id },
    });

    return res.rows[0] as unknown as UsersModel;
  }
}
