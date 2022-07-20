import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChildEntity } from '../main/entity/child.entity';
import { AddressEntity } from './entity/address.entity';
import { ClientEntity } from './entity/client.entity';
import { ClientWithSpouseEntity } from './entity/clientWithSpouse.entity';
import { CommunicationEntity } from './entity/communication.entity';
import { DeletedClientsEntity } from './entity/deletedClient.entity';
import { JobEntity } from './entity/job.entity';
import { PassportEntity } from './entity/passport.entity';
import { MainController } from './main.controller';
import { MainService } from './main.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AddressEntity,
      CommunicationEntity,
      JobEntity,
      PassportEntity,
      ChildEntity,
      ClientEntity,
      ClientWithSpouseEntity,
      DeletedClientsEntity,
    ]),
  ],
  controllers: [MainController],
  providers: [MainService],
})
export class MainModule {}
