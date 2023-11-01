import {
  IsAlphanumeric,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUsersDto {
  @IsString()
  @MinLength(3)
  @IsAlphanumeric()
  @Matches(/^[a-zA-Z0-9_]+$/)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/)
  password: string;
}
