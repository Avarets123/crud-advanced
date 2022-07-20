import { Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { ClientEntity } from './client.entity';

@Entity('clientWithSponse')
export class ClientWithSpouseEntity {
  @PrimaryColumn({ generated: 'uuid', type: 'uuid' })
  id: string;

  @OneToOne(() => ClientEntity, (client) => client.id, { eager: true })
  @JoinColumn()
  client: ClientEntity;

  @OneToOne(() => ClientEntity, (client) => client.id, { eager: true })
  @JoinColumn()
  spouse: ClientEntity;
}
