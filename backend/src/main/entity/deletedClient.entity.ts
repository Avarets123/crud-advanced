import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ClientEntity } from './client.entity';

@Entity('deletedClients')
export class DeletedClientsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => ClientEntity, (client) => client.id, { eager: true })
  @JoinColumn()
  client: ClientEntity;
}
