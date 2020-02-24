import { AccountEntity } from './account.entity';
import { AccountRegisterAuthRO, AccountAuthRO, AccountInfoRO } from './account.dto';

export class AccountMapping {
  static convertToAccountRegisterAuthRO(
    accountEntity: AccountEntity,
  ): AccountRegisterAuthRO {
    const accountRegister = new AccountRegisterAuthRO();
    accountRegister.id = accountEntity.id;
    accountRegister.username = accountEntity.username;
    accountRegister.roleId = accountEntity.role.id;
    return accountRegister;
  }

  static convertToAccountAuthRO(accountEntity: AccountEntity): AccountAuthRO {
    const accountAuth = new AccountAuthRO();
    accountAuth.id = accountEntity.id;
    accountAuth.username = accountEntity.username;
    accountAuth.roleId = accountEntity.role.id;
    accountAuth.token = accountEntity.token;
    return accountAuth;
  }

  static convertToAccountInfoRO(accountEntity: AccountEntity): AccountInfoRO {
    const accountInfo = new AccountInfoRO();
    accountInfo.id = accountEntity.id;
    accountInfo.username = accountEntity.username;
    accountInfo.firstName = accountEntity.firstName;
    accountInfo.lastName = accountEntity.lastName;
    accountInfo.phone = accountEntity.phone;
    accountInfo.email = accountEntity.email;
    accountInfo.createdDate = accountEntity.created;
    accountInfo.roleId = accountEntity.role.id;
    return accountInfo;
  }
}

