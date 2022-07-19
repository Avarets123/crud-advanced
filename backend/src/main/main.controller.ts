import { Body, Controller, Post } from '@nestjs/common';
import { CreateAddressDto } from './dto/address.create.dto';
import { AddressEntity } from './entity/address.entity';
import { MainService } from './main.service';

@Controller()
export class MainController {
  constructor(private mainService: MainService) {}

  @Post('address/create')
  async createAdress(@Body() dto: CreateAddressDto): Promise<AddressEntity> {
    return await this.mainService.createAddress(dto);
  }
}
