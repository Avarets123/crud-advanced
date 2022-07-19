import { Body, Controller, Post } from '@nestjs/common';
import { CreateAddressDto } from './dto/address.create.dto';
import { CreateCommunicationDto } from './dto/communication.create.dto';
import { CreateJobDto } from './dto/job.create.dto';
import { CreatePassportDto } from './dto/passport.create.dto';
import { AddressEntity } from './entity/address.entity';
import { CommunicationEntity } from './entity/communication.entity';
import { JobEntity } from './entity/job.entity';
import { PassportEntity } from './entity/passport.entity';
import { IJobReq } from './interfaces/job.req.interface';
import { MainService } from './main.service';

@Controller()
export class MainController {
  constructor(private mainService: MainService) {}

  @Post('address/create')
  async createAdress(@Body() dto: CreateAddressDto): Promise<AddressEntity> {
    return await this.mainService.createAddress(dto);
  }

  @Post('commun/create')
  async createCommunication(@Body() dto: CreateCommunicationDto): Promise<CommunicationEntity> {
    return await this.mainService.createCommunication(dto);
  }

  @Post('job/create')
  async createJob(@Body() dto: IJobReq): Promise<JobEntity> {
    return await this.mainService.createJob(dto);
  }

  @Post('passport/create')
  async createPassport(@Body() dto: CreatePassportDto): Promise<PassportEntity> {
    return await this.mainService.createPassport(dto);
  }
}
