import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/address.create.dto';
import { CreateChildDto } from './dto/child.create.dto';
import { CreateClientWithSponseDto } from './dto/clientWithSponse.create.dto';
import { CreateCommunicationDto } from './dto/communication.create.dto';
import { CreatePassportDto } from './dto/passport.create.dto';
import { AddressEntity } from './entity/address.entity';
import { ChildEntity } from './entity/child.entity';
import { ClientEntity } from './entity/client.entity';
import { ClientWithSponseEntity } from './entity/clientWithSponse.entity';
import { CommunicationEntity } from './entity/communication.entity';
import { JobEntity } from './entity/job.entity';
import { PassportEntity } from './entity/passport.entity';
import { IClientReq } from './interfaces/client.req.interface';
import { IJobReq } from './interfaces/job.req.interface';

@Injectable()
export class MainService {
  constructor(
    @InjectRepository(AddressEntity) private addressRepository: Repository<AddressEntity>,
    @InjectRepository(CommunicationEntity) private communicationRepository: Repository<CommunicationEntity>,
    @InjectRepository(JobEntity) private jobRepository: Repository<JobEntity>,
    @InjectRepository(PassportEntity) private passportRepository: Repository<PassportEntity>,
    @InjectRepository(ChildEntity) private childRepository: Repository<ChildEntity>,
    @InjectRepository(ClientEntity) private clientRepository: Repository<ClientEntity>,
    @InjectRepository(ClientWithSponseEntity)
    private clientWithSponseRepository: Repository<ClientWithSponseEntity>,
  ) {}

  async createAddress(dto: CreateAddressDto): Promise<AddressEntity> {
    const newAddress = new AddressEntity();
    Object.assign(newAddress, dto);
    return await this.addressRepository.save(newAddress);
  }

  async createCommunication(dto: CreateCommunicationDto): Promise<CommunicationEntity> {
    const newCommun = new CommunicationEntity();
    Object.assign(newCommun, dto);
    return await this.communicationRepository.save(newCommun);
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

  async createClient({
    client,
    children,
    passport,
    livingAddress,
    regAddress,
    jobs,
    communications,
  }: IClientReq): Promise<ClientEntity> {
    const newClient = new ClientEntity();
    Object.assign(newClient, client);

    if (regAddress) {
      const newAddress = new AddressEntity();
      Object.assign(newAddress, regAddress);
      await this.addressRepository.save(newAddress);
      newClient.regAddress = newAddress;
    }

    if (livingAddress) {
      const newAddress = new AddressEntity();
      Object.assign(newAddress, livingAddress);
      await this.addressRepository.save(newAddress);
      newClient.livingAddress = newAddress;
    }

    if (passport) {
      const newPassport = new PassportEntity();
      Object.assign(newPassport, passport);
      newClient.passport = newPassport;
      await this.passportRepository.save(newPassport);
    }

    if (children) {
      newClient.children = [];
      children.forEach((el) => {
        const newChild = new ChildEntity();
        Object.assign(newChild, el);
        this.childRepository.save(newChild);
        newClient.children.push(newChild);
      });
    }

    if (jobs) {
      newClient.jobs = [];
      jobs.forEach((el) => {
        const newJob = new JobEntity();
        Object.assign(newJob, el);
        this.jobRepository.save(newJob);
        newClient.jobs.push(newJob);
      });
    }

    if (communications) {
      newClient.communications = [];
      communications.forEach((el) => {
        const newCommunication = new CommunicationEntity();
        Object.assign(newCommunication, el);
        this.communicationRepository.save(newCommunication);
        newClient.communications.push(newCommunication);
      });
    }

    return await this.clientRepository.save(newClient);
  }

  async createClientWithSponse({
    client,
    sponse,
  }: CreateClientWithSponseDto): Promise<ClientWithSponseEntity> {
    const newClientWithSponse = new ClientWithSponseEntity();

    const newClient = await this.createClient(client);
    const newSponse = await this.createClient(sponse);

    newClientWithSponse.client = newClient;
    newClientWithSponse.sponse = newSponse;

    return await this.clientWithSponseRepository.save(newClientWithSponse);
  }

  async getAllClientOrById(id?: string): Promise<ClientEntity | ClientEntity[]> {
    if (id) {
      // return await this.clientRepository.findOneBy({ id });
    }

    return await this.clientRepository.find();
  }

  async getAllJobs(): Promise<JobEntity[]> {
    return await this.jobRepository.find();
  }
}
