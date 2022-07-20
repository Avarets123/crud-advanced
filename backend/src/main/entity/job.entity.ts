import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AddressEntity } from './address.entity';
import { ClientEntity } from './client.entity';

export enum JobType {
  Main = 'Основная работа',
  PartTime = 'Частичная занятость',
}

@Entity('job')
export class JobEntity {
  @PrimaryColumn({ generated: 'uuid', type: 'uuid', readonly: true, nullable: false })
  id: string;

  @Column({ type: 'enum', enum: JobType })
  type: JobType;

  @Column({ nullable: true })
  dateEmp: Date;

  @Column({ nullable: true })
  dateDismissal: string;

  @Column({ nullable: true })
  monIncome: number;

  @Column({ nullable: true })
  tin: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @OneToOne(() => AddressEntity, (address) => address.id, { eager: true })
  @JoinColumn()
  factAddress: AddressEntity;

  @OneToOne(() => AddressEntity, (address) => address.id, { eager: true })
  @JoinColumn()
  jurAddress: AddressEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => ClientEntity, (client) => client.id)
  person: string;
}
