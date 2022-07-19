import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('child')
export class ChildEntity {
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
}
