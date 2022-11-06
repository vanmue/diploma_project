import { IsInt, IsNotEmpty } from 'class-validator';
import { ShopEntity } from 'src/shops/shop.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

const UNIQUE_GROUP_NAME_CONSTRAINT = 'unique_group_name_constrtaint';

@Entity('deliverable_groups')
@Unique(UNIQUE_GROUP_NAME_CONSTRAINT, ['name'])
export class DeliverableGroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsInt()
  @Column('int', { comment: 'порядковый номер в списке услуг' })
  index: number; // порядковый номер в списке услуг

  @IsNotEmpty()
  @Column('text')
  name: string;

  @IsNotEmpty()
  @Column('text', { comment: 'файл изображения' })
  image: string;

  @ManyToMany(() => ShopEntity, (shop) => shop.deliverable_groups)
  @JoinTable()
  shops: ShopEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date = new Date();

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date = new Date();
}
