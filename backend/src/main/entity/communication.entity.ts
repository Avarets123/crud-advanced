import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum communicationType {
  Phone = 'мобильный телефон',
  Email = 'электронная почта',
}

@Entity({ name: 'communication' })
export class CommunicationEntity {
  @PrimaryColumn({ generated: 'uuid', readonly: true })
  id: string;

  @Column({ type: 'enum', enum: communicationType, nullable: false })
  type: communicationType;

  @Column({ nullable: false })
  value: string;
}
