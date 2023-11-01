import { Injectable } from '@nestjs/common';
import { UsersModel } from './entities/user.entity';
import { CreateUsersDto } from './users.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUsersDto) {
    // TODO: Create a new user and bycrypt its password
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }
  private readonly users: UsersModel[] = [
    {
      id: 1,
      username: 'john',
      password: 'changeme',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      state: true,
    },
    {
      id: 2,
      username: 'maria',
      password: 'guess',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      state: true,
    },
  ];

  async findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }

  update(id: number, updateUserDto: CreateUsersDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
