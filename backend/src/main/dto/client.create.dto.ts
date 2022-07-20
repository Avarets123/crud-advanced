import { IsString, IsOptional, IsDate, IsEnum, IsNumber, IsArray } from 'class-validator';
import { TypeEducation } from '../entity/client.entity';
import { IClientReq } from '../interfaces/client.req.interface';
import { CreateAddressDto } from './address.create.dto';
import { CreateChildDto } from './child.create.dto';
import { CreateCommunicationDto } from './communication.create.dto';
import { CreateJobDto } from './job.create.dto';
import { CreatePassportDto } from './passport.create.dto';

export class CreateClientDto implements IClientReq {
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
  dob?: Date;

  @IsString()
  @IsOptional()
  curWorkExp?: string;

  @IsString()
  @IsOptional()
  @IsEnum(TypeEducation)
  typeEducation?: TypeEducation;

  @IsNumber()
  @IsOptional()
  monIncome?: number;

  @IsNumber()
  @IsOptional()
  monExpenses?: number;

  @IsOptional()
  @IsArray()
  children?: CreateChildDto[];

  @IsOptional()
  passport?: CreatePassportDto;

  @IsOptional()
  livingAddress?: CreateAddressDto;

  @IsOptional()
  regAddress?: CreateAddressDto;

  @IsOptional()
  jobs?: CreateJobDto[];

  @IsOptional()
  communications?: CreateCommunicationDto[];

  @IsOptional()
  spouse?: Omit<CreateClientDto, 'spouse'>;
}
