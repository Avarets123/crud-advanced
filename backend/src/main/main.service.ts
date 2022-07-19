import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/address.create.dto';
import { AddressEntity } from './entity/address.entity';

@Injectable()
export class MainService {
  constructor(@InjectRepository(AddressEntity) private addressRepository: Repository<AddressEntity>) {}

  async createAddress(dto: CreateAddressDto): Promise<AddressEntity> {
    return await this.addressRepository.save(dto);
  }
}
