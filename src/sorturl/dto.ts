import { IsNotEmpty, IsString, IsUrl, Length } from 'class-validator';

export class CreateSorturlDto {
  @IsNotEmpty()
  @IsUrl()
  @IsString()
  url: string;
}

export class UpdateSortUrlDto {
  @IsNotEmpty()
  @IsString()
  @Length(6)
  slug: string;
}
