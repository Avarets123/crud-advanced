import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ClientEntity } from './client.entity';

@Entity('child')
export class ChildEntity {
  @PrimaryColumn({ generated: 'uuid', type: 'uuid' })
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  surname: string;

  @Column({ nullable: true })
  patronymic: string;

  @Column({ nullable: true })
  dob: Date;

  @ManyToOne(() => ClientEntity, (client) => client.id)
  @JoinColumn()
  parent: string;
}
