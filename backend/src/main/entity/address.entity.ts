import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
@Entity({ name: 'adress' })
export class AddressEntity {
  @PrimaryColumn({ generated: 'uuid', nullable: false, readonly: true })
  id: string;

  @Column({ nullable: true })
  zipcode: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  region: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  street: string;

  @Column({ nullable: true })
  house: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
