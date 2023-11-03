import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

const bcrypt = require('bcrypt');

import { UserAuth, UsersModel } from './entities/user.entity';
import { CreateUsersDto, UpdateUsernameDto } from './users.dto';
import { UsersRepository } from './users.reppsitory';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}

  async create({ password, username }: CreateUsersDto) {
    const hashPassword = await bcrypt.hash(password, 10);

    const createdUser = await this.userRepository
      .create({
        username,
        password: hashPassword,
      })
      .catch((error) => {
        throw new BadRequestException(error.message);
      });

    return this.returnUserWithoutPassword(createdUser);
  }

  async findOneByUsernameAndPassword(
    username: string,
  ): Promise<UsersModel | undefined> {
    const user = await this.userRepository.findOneByUsername(username);
    this.userNotFoundException(Boolean(user));

    return user;
  }

  async findOneByUsername(username: string): Promise<UserAuth | undefined> {
    const user = await this.userRepository.findOneByUsername(username);
    this.userNotFoundException(Boolean(user));

    return this.returnUserWithoutPassword(user);
  }

  async findOneById(id: bigint): Promise<UserAuth | undefined> {
    const user = await this.userRepository.findOneById(id);
    this.userNotFoundException(Boolean(user));

    return this.returnUserWithoutPassword(user);
  }

  async updateUsername(id: number, { username }: UpdateUsernameDto) {
    const user = await this.userRepository.updateUsername(id, username);
    this.userNotFoundException(Boolean(user));

    return this.returnUserWithoutPassword(user);
  }

  async remove(id: number) {
    const isUserDeleted = await this.userRepository.remove(id);
    this.userNotFoundException(isUserDeleted);

    return {
      message: 'User deleted successfully',
      id,
    };
  }

  returnUserWithoutPassword(user: UsersModel) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  private userNotFoundException(user: boolean) {
    if (!user) throw new NotFoundException('User not found');
  }
}
