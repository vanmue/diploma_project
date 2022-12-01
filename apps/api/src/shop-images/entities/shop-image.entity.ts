import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsBooleanString } from 'class-validator';
import { FileEntity } from 'src/files/entities/file.entity';
import { ShopEntity } from 'src/shops/entities/shop.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('shop_images')
export class ShopImageEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => ShopEntity, (shop) => shop.images)
  @ApiProperty({ type: () => ShopEntity })
  shop: ShopEntity;

  @Column({ type: 'boolean', default: false })
  @IsBooleanString()
  @ApiProperty({ enum: ['true', 'false'] })
  is_preview: boolean;

  @OneToOne(() => FileEntity, undefined, { onDelete: 'RESTRICT' })
  @JoinColumn()
  file: FileEntity;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date = new Date();

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date = new Date();
}
