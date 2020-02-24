import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ScrapEntity } from '../scrap/scrap.entity';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({
    type: 'text',
    unique: true,
  })
  type: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  isDeleted: boolean;

  @OneToMany(
    type => ScrapEntity,
    scrap => scrap.category,
  )
  scraps: ScrapEntity[];
}
