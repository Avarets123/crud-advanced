import { Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { ClientEntity } from './client.entity';

@Entity('clientWithSponse')
export class ClientWithSponseEntity {
  @PrimaryColumn({ generated: 'uuid' })
  id: string;

  @OneToOne(() => ClientEntity, (client) => client.id, { nullable: false, eager: true })
  client: ClientEntity;

  @OneToOne(() => ClientEntity, (client) => client.id, { nullable: false, eager: true })
  sponse: ClientEntity;
}
