import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/address.create.dto';
import { CreateChildDto } from './dto/child.create.dto';
import { CreateClientDto } from './dto/client.create.dto';
import { CreateCommunicationDto } from './dto/communication.create.dto';
import { CreateJobDto } from './dto/job.create.dto';
import { CreatePassportDto } from './dto/passport.create.dto';
import { AddressEntity } from './entity/address.entity';
import { ChildEntity } from './entity/child.entity';
import { ClientEntity } from './entity/client.entity';
import { ClientWithSpouseEntity } from './entity/clientWithSpouse.entity';
import { CommunicationEntity } from './entity/communication.entity';
import { JobEntity } from './entity/job.entity';
import { PassportEntity } from './entity/passport.entity';
import { IJobReq } from './interfaces/job.req.interface';
import { IQueryParam } from './interfaces/query.interface';

@Injectable()
export class MainService {
  constructor(
    @InjectRepository(AddressEntity) private addressRepository: Repository<AddressEntity>,
    @InjectRepository(CommunicationEntity) private communicationRepository: Repository<CommunicationEntity>,
    @InjectRepository(JobEntity) private jobRepository: Repository<JobEntity>,
    @InjectRepository(PassportEntity) private passportRepository: Repository<PassportEntity>,
    @InjectRepository(ChildEntity) private childRepository: Repository<ChildEntity>,
    @InjectRepository(ClientEntity) private clientRepository: Repository<ClientEntity>,
    @InjectRepository(ClientWithSpouseEntity)
    private clientWithSponseRepository: Repository<ClientWithSpouseEntity>,
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
    children,
    passport,
    livingAddress,
    regAddress,
    jobs,
    communications,
    ...other
  }: CreateClientDto): Promise<ClientEntity> {
    const newClient = new ClientEntity();
    Object.assign(newClient, other);
    await this.clientRepository.save(newClient);

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
      children.forEach(async (el) => {
        const newChild = new ChildEntity();
        Object.assign(newChild, el);
        newChild.parent = newClient.id;
        await this.childRepository.save(newChild);
        newClient.children.push(newChild);
      });
    }

    if (jobs) {
      newClient.jobs = [];
      jobs.forEach(async (el) => {
        const newJob = new JobEntity();
        Object.assign(newJob, el);
        newJob.person = newClient.id;
        await this.jobRepository.save(newJob);
        newClient.jobs.push(newJob);
      });
    }

    if (communications) {
      newClient.communications = [];
      communications.forEach(async (el) => {
        const newCommunication = new CommunicationEntity();
        Object.assign(newCommunication, el);
        newCommunication.person = newClient.id;
        await this.communicationRepository.save(newCommunication);
        newClient.communications.push(newCommunication);
      });
    }

    return await this.clientRepository.save(newClient);
  }

  async createClientWithSponse({ spouse, ...other }: CreateClientDto): Promise<ClientWithSpouseEntity> {
    const newClientWithSponse = new ClientWithSpouseEntity();

    const newClient = await this.createClient(other);
    const newSponse = await this.createClient(spouse);

    newClientWithSponse.client = newClient;
    newClientWithSponse.spouse = newSponse;

    return await this.clientWithSponseRepository.save(newClientWithSponse);
  }

  async getAllClientOrById(
    id?: string,
    query?: IQueryParam,
  ): Promise<ClientEntity | ClientEntity[] | string> {
    if (id) {
      const client = await this.clientRepository
        .createQueryBuilder('client')
        .leftJoinAndSelect('client.passport', 'passport')
        .leftJoinAndSelect('client.regAddress', 'regAddress')
        .leftJoinAndSelect('client.livingAddress', 'livingAddress')
        .leftJoinAndSelect('client.jobs', 'job')
        .leftJoinAndSelect('client.children', 'child')
        .leftJoinAndSelect('client.communications', 'communication')
        .andWhere('client.deleted = false')
        .orderBy('client.createdAt', 'DESC')
        .andWhere('client.id = :id', { id })
        .getOne();

      return client ? client : 'Данный пользователь был удален';
    }

    const { limit, page, search, sortBy, sortDir } = query;

    const clients = this.clientRepository
      .createQueryBuilder('client')
      .leftJoinAndSelect('client.passport', 'passport')
      .leftJoinAndSelect('client.regAddress', 'regAddress')
      .leftJoinAndSelect('client.livingAddress', 'livingAddress')
      .leftJoinAndSelect('client.jobs', 'job')
      .leftJoinAndSelect('client.children', 'child')
      .leftJoinAndSelect('client.communications', 'communication')
      .andWhere('client.deleted = false');

    if (sortBy) {
      if (sortDir === 'ASC') {
        clients.orderBy(`client.${sortBy}`, 'ASC');
      }

      clients.orderBy(`client.${sortBy}`, 'DESC');
    }

    if (!sortBy) {
      clients.orderBy('client.createdAt', 'DESC');
    }

    if (search) {
      clients.andWhere('client.name LIKE :name', { name: `%${search}%` });
    }

    if (page) {
      clients.offset(+page * 10);
    }

    return await clients.getMany();
  }

  async getAllJobs(): Promise<JobEntity[]> {
    return await this.jobRepository.find();
  }

  private async useUpdateById<R, D extends { id?: string; length?: number; forEach?: (el: any) => void }>(
    dto: D,
    repository: Repository<R>,
    id?: string,
  ): Promise<R> {
    if (id) {
      // @ts-ignore
      const findClient = await repository.findOneBy({ id });
      Object.assign(findClient, dto);
      return await repository.save(findClient);
    }

    if (dto?.length > 0) {
      dto.forEach((el) => {
        if (el?.id) {
          (async function () {
            //@ts-ignore
            const findEntity = await repository.findOneBy({ id: el.id });
            Object.assign(findEntity, el);
            await repository.save(findEntity);
          })();
        }
      });
    }

    if (typeof dto === 'object') {
      if (dto?.id) {
        //@ts-ignore
        const findEntity = await repository.findOneBy({ id });
        Object.assign(findEntity, dto);
        return await repository.save(findEntity);
      }
    }
  }

  private async useUpdateWithoutId<D extends { id?: string }, R extends { id: string }>(
    client: ClientEntity,
    dto: D,
    entity: R,
    repository: Repository<R>,
    namePropertyClient: string,
  ) {
    if (!dto?.id && dto) {
      const newEntity = entity;
      Object.assign(newEntity, dto);
      await repository.save(newEntity);

      client[namePropertyClient] = newEntity.id;
    }
  }

  private async clearData(client: ClientEntity, dto: any, nameDto: string): Promise<void> {
    if (dto === null) {
      client[nameDto] = null;
    }
  }

  async updateClient(id: string, dto: CreateClientDto) {
    const { regAddress, livingAddress, passport, spouse, children, communications, jobs, ...other } = dto;

    let findClient = await this.clientRepository.findOneBy({ id });

    if (!findClient) {
      throw new HttpException(`Клиент с таким id: ${id} не существует`, HttpStatus.BAD_REQUEST);
    }

    findClient = await this.useUpdateById<ClientEntity, CreateClientDto>(other, this.clientRepository, id);
    await this.useUpdateById<AddressEntity, CreateAddressDto>(regAddress, this.addressRepository);
    await this.useUpdateById<AddressEntity, CreateAddressDto>(livingAddress, this.addressRepository);
    await this.useUpdateById<PassportEntity, CreatePassportDto>(passport, this.passportRepository);
    await this.useUpdateById<ChildEntity, CreateChildDto[]>(children, this.childRepository);
    await this.useUpdateById<CommunicationEntity, CreateCommunicationDto[]>(
      communications,
      this.communicationRepository,
    );
    await this.useUpdateById<JobEntity, CreateJobDto[]>(jobs, this.jobRepository);

    await this.clearData(findClient, regAddress, 'regAddress');
    await this.clearData(findClient, livingAddress, 'livingAddress');
    await this.clearData(findClient, passport, 'passport');

    await this.useUpdateWithoutId<CreateAddressDto, AddressEntity>(
      findClient,
      regAddress,
      new AddressEntity(),
      this.addressRepository,
      'regAddress',
    );

    await this.useUpdateWithoutId<CreateAddressDto, AddressEntity>(
      findClient,
      livingAddress,
      new AddressEntity(),
      this.addressRepository,
      'livingAddress',
    );

    await this.useUpdateWithoutId<CreatePassportDto, PassportEntity>(
      findClient,
      passport,
      new PassportEntity(),
      this.passportRepository,
      'passport',
    );
    await this.clientRepository.save(findClient);

    // if (spouse) {
    //   await this.updateClient(spouse.id, spouse);
    // }

    return 'updated';
  }

  async softDelete(id: string): Promise<string> {
    const hasClient = await this.clientRepository.findOneBy({ id });

    if (!hasClient) {
      throw new HttpException('Такой клиент не  зарегистрирован', HttpStatus.BAD_REQUEST);
    }

    hasClient.deleted = true;
    await this.clientRepository.save(hasClient);

    return 'Клиент был перемещен в архив и в скором времени будет удален';
  }
}
