import { IsNotEmpty } from 'class-validator';
import { CityEntity } from 'src/cities/city.entity';
import { DeliverableGroupEntity } from 'src/deliverables/groups/deliverable-group.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ShopAdvantageEntity } from './shop-advantages/shop-advantage.entity';

@Entity('shops')
export class ShopEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column('text')
  address: string;

  @IsNotEmpty()
  @Column('text')
  phone: string;

  @ManyToOne(() => CityEntity, (city) => city.shops)
  city: CityEntity;

  @ManyToMany(() => ShopAdvantageEntity, (advantage) => advantage.shops, {
    onDelete: 'RESTRICT',
    cascade: true,
  })
  advantages: ShopAdvantageEntity[];

  @ManyToMany(
    () => DeliverableGroupEntity,
    (deliverableGroup) => deliverableGroup.shops,
    { onDelete: 'RESTRICT', cascade: true },
  )
  deliverable_groups: DeliverableGroupEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date = new Date();

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date = new Date();
}
