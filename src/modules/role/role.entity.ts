import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { AccountEntity } from '../account/account.entity';

@Entity('role')
export class RoleEntity {
  @PrimaryColumn('int')
  id: number;

  @Column('text')
  roleTitle: string;

  @Column('boolean')
  isDeleted: boolean;

  @OneToMany(
    type => AccountEntity,
    account => account.role,
  )
  accounts: AccountEntity[];
}
