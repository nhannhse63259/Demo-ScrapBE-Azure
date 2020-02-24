import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './account.entity';
import { RoleEntity } from '../role/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity, RoleEntity])],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
