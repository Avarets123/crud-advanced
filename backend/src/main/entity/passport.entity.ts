import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('passport')
export class PassportEntity {
  @PrimaryColumn({ generated: 'uuid', readonly: true, nullable: false })
  id: string;

  @Column({ nullable: true })
  series: string;

  @Column({ nullable: true })
  number: string;

  @Column({ nullable: true })
  giver: string;

  @Column({ nullable: true })
  dataIssued: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
