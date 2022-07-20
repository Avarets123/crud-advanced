import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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
  secondary = 'Среднее',
  secondarySpecial = 'Среднеен специальное',
  incompleteHigher = 'Незаконченное высшее',
  hogher = 'Высшее',
  twoOrMoreHigher = 'Два и более высших образований',
  academicDegree = 'Академическая степень',
}

@Entity('client')
export class ClientEntity {
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

  @OneToOne(() => PassportEntity, (passport) => passport.id, { eager: true })
  @JoinColumn()
  passport: PassportEntity;

  @OneToMany(() => ChildEntity, (child) => child.parent, { eager: true })
  @JoinColumn()
  children: ChildEntity[];

  @OneToOne(() => AddressEntity, (address) => address.id, { eager: true })
  @JoinColumn()
  livingAddress: AddressEntity;

  @OneToOne(() => AddressEntity, (address) => address.id, { eager: true })
  @JoinColumn()
  regAddress: AddressEntity;

  @OneToMany(() => JobEntity, (job) => job.person, { eager: true })
  jobs: JobEntity[];

  @Column({ nullable: true })
  curWorkExp: number;

  @Column({ type: 'enum', enum: TypeEducation, nullable: true })
  typeEducation: TypeEducation;

  @Column({ type: 'numeric', nullable: true })
  monIncome: number;

  @Column({ type: 'numeric', nullable: true })
  monExpenses: number;

  @OneToMany(() => CommunicationEntity, (comm) => comm.person, { eager: true })
  communications: CommunicationEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
