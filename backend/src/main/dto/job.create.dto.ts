import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { JobType } from '../entity/job.entity';

export class CreateJobDto {
  id?: string;

  @IsOptional()
  @IsEnum(JobType)
  type?: JobType;

  @IsOptional()
  @IsDate()
  dateEmp?: Date;

  @IsOptional()
  @IsString()
  dateDismissal?: string;

  @IsOptional()
  @IsNumber()
  monIncome?: number;

  @IsOptional()
  @IsString()
  tin?: string;
}
