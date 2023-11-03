import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class UpdateUsernameDto {
  @IsString({ message: 'username must be a string' })
  @MinLength(3, { message: 'username must be at least 3 characters long' })
  @Matches(/^[a-zA-Z0-9_]*$/, { message: 'username must be alphanumeric' })
  username: string;
}

export class CreateUsersDto extends UpdateUsernameDto {
  @IsString({ message: 'password must be a string' })
  @IsNotEmpty({ message: 'password must not be empty' })
  @MinLength(8, { message: 'password must be at least 8 characters long' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/, {
    message:
      'password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character',
  })
  password: string;
}
