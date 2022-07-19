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

export enum JobType {
  Main = 'Основная работа',
  PartTime = 'Частичная занятость',
}

@Entity('job')
export class JobEntity {
  @PrimaryColumn({ generated: 'uuid', readonly: true, nullable: false })
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

  @OneToOne(() => AddressEntity, { eager: true })
  factAddress: AddressEntity;

  @OneToOne(() => AddressEntity, { eager: true })
  jurAddress: AddressEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
