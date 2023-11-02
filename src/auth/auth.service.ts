import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

const bcrypt = require('bcrypt');

import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (!user) throw new UnauthorizedException();

    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) throw new UnauthorizedException();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;

    return {
      access_token: await this.jwtService.signAsync(result),
    };
  }
}
