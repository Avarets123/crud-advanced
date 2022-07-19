import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/address.create.dto';
import { CreateChildDto } from './dto/child.create.dto';
import { CreateCommunicationDto } from './dto/communication.create.dto';
import { CreatePassportDto } from './dto/passport.create.dto';
import { AddressEntity } from './entity/address.entity';
import { ChildEntity } from './entity/child.entity';
import { CommunicationEntity } from './entity/communication.entity';
import { JobEntity } from './entity/job.entity';
import { PassportEntity } from './entity/passport.entity';
import { IJobReq } from './interfaces/job.req.interface';

@Injectable()
export class MainService {
  constructor(
    @InjectRepository(AddressEntity) private addressRepository: Repository<AddressEntity>,
    @InjectRepository(CommunicationEntity) private communicationRepository: Repository<CommunicationEntity>,
    @InjectRepository(JobEntity) private jobRepository: Repository<JobEntity>,
    @InjectRepository(PassportEntity) private passportRepository: Repository<PassportEntity>,
    @InjectRepository(ChildEntity) private childRepository: Repository<ChildEntity>,
  ) {}

  async createAddress(dto: CreateAddressDto): Promise<AddressEntity> {
    return await this.addressRepository.save(dto);
  }

  async createCommunication(dto: CreateCommunicationDto): Promise<CommunicationEntity> {
    return await this.communicationRepository.save(dto);
  }

  async createJob({ job, factAddress, jurAddress: jurAddress }: IJobReq): Promise<JobEntity> {
    const newJob = new JobEntity();

    if (factAddress) {
      const newFactAddress = new AddressEntity();
      Object.assign(newFactAddress, factAddress);
      await this.addressRepository.save(newFactAddress);
      newJob.factAddress = newFactAddress;
    }

    if (jurAddress) {
      const newJurAddress = new AddressEntity();
      Object.assign(newJurAddress, jurAddress);
      await this.addressRepository.save(newJurAddress);
      newJob.jurAddress = newJurAddress;
    }

    Object.assign(newJob, job);
    return await this.jobRepository.save(newJob);
  }

  async createPassport(dto: CreatePassportDto): Promise<PassportEntity> {
    const newPassport = new PassportEntity();
    Object.assign(newPassport, dto);
    return await this.passportRepository.save(newPassport);
  }

  async createChild(dto: CreateChildDto): Promise<ChildEntity> {
    const newChild = new ChildEntity();
    Object.assign(newChild, dto);
    return await this.childRepository.save(newChild);
  }
}
