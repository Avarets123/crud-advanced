import { communicationType } from '../entity/communication.entity';

export class CreateCommunicationDto {
  type: communicationType;
  value: string;
}
