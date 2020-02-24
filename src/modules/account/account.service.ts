import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AccountEntity } from './account.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AccountDTO,
  AccountAuthRO,
  CreateAccountDTO,
  AccountRegisterAuthRO,
  AccountInfoRO,
} from './account.dto';
import { AccountMapping } from './account.mapping';
import { RoleEntity } from '../role/role.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
  ) {}

  async getListAccounts(): Promise<AccountInfoRO[]> {
    const accountList = await this.accountRepository.find({
      relations: ['role'],
    });
    return accountList.map(account =>
      AccountMapping.convertToAccountInfoRO(account),
    );
  }

  async login(accountDTO: AccountDTO): Promise<AccountAuthRO> {
    const { username, password } = accountDTO;
    const account = await this.accountRepository.findOne({
      where: { username },
      relations: ['role'],
    });
    if (!account || !(await account.comparePassword(password))) {
      throw new HttpException(
        'Invalid username/password',
        HttpStatus.BAD_REQUEST,
      );
    }
    return AccountMapping.convertToAccountAuthRO(account);
  }

  async register(accountDTO: CreateAccountDTO): Promise<AccountRegisterAuthRO> {
    const { username } = accountDTO;
    let account = await this.accountRepository.findOne({ where: { username } });
    if (account) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    account = await this.accountRepository.create(accountDTO);
    account.role = await this.roleRepository.findOne({
      where: { id: accountDTO.roleId },
    });
    await this.accountRepository.save(account);
    const result = await this.accountRepository.findOne({
      where: { username },
      relations: ['role'],
    });
    return AccountMapping.convertToAccountRegisterAuthRO(result);
  }
}
