import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/address.create.dto';
import { CreateCommunicationDto } from './dto/communication.create.dto';
import { AddressEntity } from './entity/address.entity';
import { CommunicationEntity } from './entity/communication.entity';

@Injectable()
export class MainService {
  constructor(
    @InjectRepository(AddressEntity) private addressRepository: Repository<AddressEntity>,
    @InjectRepository(CommunicationEntity) private communicationRepository: Repository<CommunicationEntity>,
  ) {}

  async createAddress(dto: CreateAddressDto): Promise<AddressEntity> {
    return await this.addressRepository.save(dto);
  }

  async createCommunication(dto: CreateCommunicationDto): Promise<CommunicationEntity> {
    return await this.communicationRepository.save(dto);
  }
}
