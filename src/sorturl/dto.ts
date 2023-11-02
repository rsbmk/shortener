import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateSorturlDto {
  @IsNotEmpty()
  @IsUrl()
  @IsString()
  url: string;

  @IsString()
  @IsOptional()
  @MinLength(6)
  @MaxLength(10)
  name?: string;
}

export class UpdateSortUrlDto {
  @IsNotEmpty()
  @IsString()
  @Length(6)
  slug: string;
}
