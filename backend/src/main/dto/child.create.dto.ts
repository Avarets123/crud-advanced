import { IsDate, IsOptional, IsString } from 'class-validator';

export class CreateChildDto {
  id?: string;

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
