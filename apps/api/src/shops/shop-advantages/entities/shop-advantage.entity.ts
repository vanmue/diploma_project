import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { ShopEntity } from '../../entities/shop.entity';

const UNIQUE_SHOP_ADVANTAGE_NAME_CONSTRAINT =
  'unique_shop_advantage_name_constrtaint';

@Entity('shop_advantages')
@Unique(UNIQUE_SHOP_ADVANTAGE_NAME_CONSTRAINT, ['name'])
export class ShopAdvantageEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @Column('text')
  @ApiProperty()
  name: string;

  @ManyToMany(() => ShopEntity, (shop) => shop.advantages, {
    onDelete: 'RESTRICT',
    cascade: true,
  })
  @ApiProperty()
  shops: ShopEntity[];

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date = new Date();

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date = new Date();
}
