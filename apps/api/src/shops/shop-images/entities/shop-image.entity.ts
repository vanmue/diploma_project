import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsBooleanString, IsNotEmpty } from 'class-validator';
import { ShopEntity } from 'src/shops/entities/shop.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('shop_images')
export class ShopImageEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @Column({ type: 'varchar' })
  @ApiProperty()
  img: string;

  @ManyToOne(() => ShopEntity, (shop) => shop.images)
  @ApiProperty({ type: () => ShopEntity })
  shop: ShopEntity;

  @Column({ type: 'boolean', default: false })
  @IsBooleanString()
  @ApiProperty({ enum: ['true', 'false'] })
  is_preview: boolean;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date = new Date();

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date = new Date();
}
