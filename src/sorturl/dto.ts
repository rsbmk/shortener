import { IsNotEmpty, IsOptional, IsString, IsUrl, Length, MaxLength } from 'class-validator';

export class CreateSorturlDto {
  @IsNotEmpty()
  @IsUrl()
  @IsString()
  url: string;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  name?: string;
}

export class UpdateSortUrlDto {
  @IsNotEmpty()
  @IsString()
  @Length(6)
  slug: string;
}
