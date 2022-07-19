import { JobType } from '../entity/job.entity';

export class CreateJobDto {
  type?: JobType;
  dateEmp?: Date;
  dateDismissal?: string;
  monIncome?: number;
  tin?: string;
}
