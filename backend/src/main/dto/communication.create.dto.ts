import { CommunicationType } from '../entity/communication.entity';

export class CreateCommunicationDto {
  type: CommunicationType;
  value: string;
}
