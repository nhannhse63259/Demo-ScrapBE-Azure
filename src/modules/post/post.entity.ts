import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { AccountEntity } from '../account/account.entity';

@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
  })
  title: string;

  @Column({
    type: 'text',
  })
  address: string;

  @CreateDateColumn()
  created: Date;

  @Column({
    type: 'boolean',
    default: false,
  })
  isDeleted: boolean;

  @ManyToOne(
    type => AccountEntity,
    homeowner => homeowner.listPost,
  )
  homeowner: AccountEntity;
}
