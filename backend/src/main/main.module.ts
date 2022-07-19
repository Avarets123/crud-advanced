import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from './entity/address.entity';
import { CommunicationEntity } from './entity/communication.entity';
import { MainController } from './main.controller';
import { MainService } from './main.service';

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity, CommunicationEntity])],
  controllers: [MainController],
  providers: [MainService],
})
export class MainModule {}
