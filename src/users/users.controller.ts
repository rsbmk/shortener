import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  SetMetadata,
} from '@nestjs/common';
import { CreateUsersDto } from './users.dto';
import { UsersService } from './users.service';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Public()
  async create(@Body() createUserDto: CreateUsersDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':usernmae')
  findOne(@Param('usernmae') usernmae: string) {
    const user = this.usersService.findOne(usernmae);
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: CreateUsersDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
