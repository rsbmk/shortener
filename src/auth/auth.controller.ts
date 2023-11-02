import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { Public } from 'src/users/users.controller';
import { CreateUsersDto } from 'src/users/users.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: CreateUsersDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
}
