import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CreateAddressDto } from './dto/address.create.dto';
import { CreateChildDto } from './dto/child.create.dto';
import { CreateClientDto } from './dto/client.create.dto';
import { CreateCommunicationDto } from './dto/communication.create.dto';
import { CreatePassportDto } from './dto/passport.create.dto';
import { AddressEntity } from './entity/address.entity';
import { ChildEntity } from './entity/child.entity';
import { ClientEntity } from './entity/client.entity';
import { ClientWithSpouseEntity } from './entity/clientWithSpouse.entity';
import { CommunicationEntity } from './entity/communication.entity';
import { JobEntity } from './entity/job.entity';
import { PassportEntity } from './entity/passport.entity';
import { IClientReq } from './interfaces/client.req.interface';
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

  @Post('child/create')
  async createChild(@Body() dto: CreateChildDto): Promise<ChildEntity> {
    return await this.mainService.createChild(dto);
  }

  @Post('clients')
  async createClient(@Body() dto: CreateClientDto): Promise<ClientEntity | ClientWithSpouseEntity> {
    const { spouse } = dto;

    if (spouse) {
      return await this.mainService.createClientWithSponse(dto);
    }

    return await this.mainService.createClient(dto);
  }

  @Get('clients')
  async getAllClient() {
    return await this.mainService.getAllClientOrById();
  }

  @Get('client/:clientId')
  async getClientById(@Param('clientId') id: string) {
    return await this.mainService.getAllClientOrById(id);
  }

  @Get('jobs')
  async getJobs(): Promise<JobEntity[]> {
    return await this.mainService.getAllJobs();
  }

  @Patch('clients/:clientId')
  async updateClient(@Param('clientId') id: string, @Body() dto: CreateClientDto) {
    return await this.mainService.updateClient(id, dto);
  }

  @Delete('clients/:id')
  async softDelete(@Param('id') id: string) {
    console.log(id);
    return await this.mainService.softDelete(id);
  }
}
