import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CategoryEntity } from '../category/category.entity';

@Entity('scrap')
export class ScrapEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'text',
  })
  name: string;

  @ManyToOne(
    type => CategoryEntity,
    category => category.scraps,
  )
  category: CategoryEntity;

  @Column({
    type: 'boolean',
    default: false,
  })
  isDeleted: boolean;
}
