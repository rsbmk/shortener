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
    const user = await this.usersService.findOneByUsernameAndPassword(username);
    if (!user) throw new UnauthorizedException();

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) throw new UnauthorizedException();

    const result = this.usersService.returnUserWithoutPassword(user);
    let access_token: string;

    try {
      access_token = await this.jwtService.signAsync(result, {
        secret: process.env.JWT_SECRET,
      });
    } catch (error) {
      console.log('login error', error);
    }

    return {
      access_token,
    };
  }
}
