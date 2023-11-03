import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  SetMetadata,
} from '@nestjs/common';
import { GET_USER_BY } from './entities/user.entity';
import { CreateUsersDto, UpdateUsernameDto } from './users.dto';
import { UsersService } from './users.service';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Public()
  async create(@Body() createUserDto: CreateUsersDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':identifier')
  findOneByUsername(
    @Param('identifier') identifier: string,
    @Query('type') type: GET_USER_BY = GET_USER_BY.USERNAME,
  ) {
    if (type === GET_USER_BY.ID) {
      if (isNaN(Number(identifier))) throw new BadRequestException('id is not a number');

      return this.usersService.findOneById(BigInt(identifier));
    }
    return this.usersService.findOneByUsername(identifier);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUsernameDto) {
    return this.usersService.updateUsername(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
