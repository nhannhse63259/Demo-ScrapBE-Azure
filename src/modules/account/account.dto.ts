import { IsNotEmpty } from 'class-validator';

export class AccountDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

export class CreateAccountDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  roleId: number;
}

export class AccountAuthRO {
  id: string;
  username: string;
  roleId: number;
  token: string;
}

export class AccountRegisterAuthRO {
  id: string;
  username: string;
  roleId: number;
}

export class AccountInfoRO {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  roleId: number;
  createdDate: Date;
}
