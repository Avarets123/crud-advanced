import { CreateAddressDto } from '../dto/address.create.dto';
import { CreateJobDto } from '../dto/job.create.dto';

export interface IJobReq {
  job: CreateJobDto;
  factAddress: CreateAddressDto;
  jurAddress?: CreateAddressDto;
}
