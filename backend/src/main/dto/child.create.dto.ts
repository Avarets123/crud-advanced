import { IsDate, IsOptional, IsString } from 'class-validator';

export class CreateChildDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  surname?: string;

  @IsString()
  @IsOptional()
  patronymic?: string;

  @IsDate()
  @IsOptional()
  dob: Date;
}
