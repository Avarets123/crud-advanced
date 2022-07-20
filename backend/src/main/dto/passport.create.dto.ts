import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePassportDto {
  id?: string;

  @IsOptional()
  @IsString()
  series?: string;

  @IsOptional()
  @IsNumber()
  number?: number;

  @IsOptional()
  @IsString()
  giver?: string;

  @IsOptional()
  @IsDate()
  dataIssued?: Date;
}
