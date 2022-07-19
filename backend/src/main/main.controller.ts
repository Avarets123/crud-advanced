import { Body, Controller, Post } from '@nestjs/common';
import { CreateAddressDto } from './dto/address.create.dto';
import { CreateCommunicationDto } from './dto/communication.create.dto';
import { AddressEntity } from './entity/address.entity';
import { CommunicationEntity } from './entity/communication.entity';
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
}
