import { TypeEducation } from '../entity/client.entity';

export class CreateClientDto {
  name?: string;
  surname?: string;
  patronymic?: string;
  dob?: Date;
  curWorkExp?: string;
  typeEducation?: TypeEducation;
  monIncome?: number;
  monExpenses?: number;
}
