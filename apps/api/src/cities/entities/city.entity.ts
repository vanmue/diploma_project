import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { ShopEntity } from 'src/shops/entities/shop.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('cities')
export class CityEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @Column({ type: 'varchar' })
  @ApiProperty()
  name: string;

  @OneToMany(() => ShopEntity, (shop) => shop.city)
  @ApiProperty({ type: () => ShopEntity })
  shops: ShopEntity[];

  @Column('float', {
    comment: 'долгота центра карты',
    nullable: true,
    select: false,
  })
  @ApiProperty()
  center_longtitude: number;

  @Column('float', {
    comment: 'широта центра карты',
    nullable: true,
    select: false,
  })
  @ApiProperty()
  center_latitude: number;

  @Column('float', {
    comment: 'долгота метки центра',
    nullable: true,
    select: false,
  })
  @ApiProperty()
  label_longtitude: number;

  @Column('float', {
    comment: 'широта метки центра',
    nullable: true,
    select: false,
  })
  @ApiProperty()
  label_latitude: number;

  @Column('int', { comment: 'масштаб карты', nullable: true, select: false })
  @ApiProperty()
  zoom: number;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date = new Date();

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date = new Date();
}
