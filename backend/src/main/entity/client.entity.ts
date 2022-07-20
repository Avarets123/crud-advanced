import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AddressEntity } from './address.entity';
import { ChildEntity } from './child.entity';
import { CommunicationEntity } from './communication.entity';
import { JobEntity } from './job.entity';
import { PassportEntity } from './passport.entity';

export enum TypeEducation {
  Secondary = 'Среднее',
  SecondarySpecial = 'Среднеен специальное',
  IncompleteHigher = 'Незаконченное высшее',
  Hogher = 'Высшее',
  TwoOrMoreHigher = 'Два и более высших образований',
  AcademicDegree = 'Академическая степень',
}

@Entity('client')
export class ClientEntity {
  @PrimaryColumn({ generated: 'uuid' })
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  surname: string;

  @Column({ nullable: true })
  patronymic: string;

  @Column({ nullable: true })
  dob: Date;

  @OneToOne(() => PassportEntity, { eager: true })
  passport: PassportEntity;

  @OneToMany(() => ChildEntity, (child) => child.id, { eager: true })
  children: ChildEntity[];

  @OneToOne(() => AddressEntity, { eager: true })
  livingAddress: AddressEntity;

  @OneToOne(() => AddressEntity, { eager: true })
  regAddress: AddressEntity;

  @OneToMany(() => JobEntity, (job) => job.id, { eager: true })
  jobs: JobEntity[];

  @Column({ nullable: true })
  curWorkExp: number;

  @Column({ type: 'enum', enum: TypeEducation, nullable: true })
  typeEducation: TypeEducation;

  @Column({ type: 'numeric', nullable: true })
  monIncome: number;

  @Column({ type: 'numeric', nullable: true })
  monExpenses: number;

  @OneToMany(() => CommunicationEntity, (comm) => comm.id, { eager: true })
  communications: CommunicationEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
