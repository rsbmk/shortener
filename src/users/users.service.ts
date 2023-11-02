import { BadRequestException, Injectable } from '@nestjs/common';

const bcrypt = require('bcrypt');

import { UsersModel } from './entities/user.entity';
import { CreateUsersDto } from './users.dto';
import { UsersRepository } from './users.reppsitory';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}

  async create({ password, username }: CreateUsersDto) {
    const hashPassword = await bcrypt.hash(password, 10);

    return await this.userRepository
      .create({
        username,
        password: hashPassword,
      })
      .catch((error) => {
        let message = 'Error to create user';
        if (error instanceof Error) message = error.message;
        throw new BadRequestException(message);
      });
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(username: string): Promise<UsersModel | undefined> {
    const user = await this.userRepository.findOneByUsername(username);
    if (!user) return undefined;

    return user;
  }

  update(id: number, updateUserDto: CreateUsersDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
