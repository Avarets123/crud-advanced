import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum CommunicationType {
  Phone = 'мобильный телефон',
  Email = 'электронная почта',
}

@Entity({ name: 'communication' })
export class CommunicationEntity {
  @PrimaryColumn({ generated: 'uuid', type: 'uuid', readonly: true })
  id: string;

  @Column({ type: 'enum', enum: CommunicationType, nullable: false })
  type: CommunicationType;

  @Column({ nullable: false })
  value: string;
}
