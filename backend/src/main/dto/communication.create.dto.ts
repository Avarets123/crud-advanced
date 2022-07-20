import { IsEnum, IsString } from 'class-validator';
import { CommunicationType } from '../entity/communication.entity';

export class CreateCommunicationDto {
  id?: string;

  @IsEnum(CommunicationType)
  type: CommunicationType;

  @IsString()
  value: string;
}
