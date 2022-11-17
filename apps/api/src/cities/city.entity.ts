import { IsNotEmpty } from 'class-validator';
import { ShopEntity } from 'src/shops/shop.entity';
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
  id: number;

  @IsNotEmpty()
  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(() => ShopEntity, (shop) => shop.city)
  shops: ShopEntity[];

  @Column('float', {
    comment: 'долгота центра карты',
    nullable: true,
    select: false,
  })
  center_longtitude: number;

  @Column('float', {
    comment: 'широта центра карты',
    nullable: true,
    select: false,
  })
  center_latitude: number;

  @Column('float', {
    comment: 'долгота метки центра',
    nullable: true,
    select: false,
  })
  label_longtitude: number;

  @Column('float', {
    comment: 'широта метки центра',
    nullable: true,
    select: false,
  })
  label_latitude: number;

  @Column('int', { comment: 'масштаб карты', nullable: true, select: false })
  zoom: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date = new Date();

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date = new Date();
}
