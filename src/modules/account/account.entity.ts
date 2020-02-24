import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { RoleEntity } from '../role/role.entity';
import { PostEntity } from '../post/post.entity';

@Entity('account')
export class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    unique: true,
  })
  username: string;

  @Column({
    type: 'text',
  })
  password: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  firstName: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  lastName: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  phone: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  email: string;

  @ManyToOne(
    type => RoleEntity,
    role => role.accounts,
  )
  role: RoleEntity;

  @OneToMany(
    type => PostEntity,
    listPost => listPost.homeowner,
  )
  listPost: PostEntity[];

  @CreateDateColumn()
  created: Date;

  @Column({
    type: 'boolean',
    default: false,
  })
  isDeleted: boolean;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  get token() {
    const { id, username, role } = this;
    return jwt.sign({ id, username, role }, process.env.SECRET, {
      expiresIn: '7d',
    });
  }
}
