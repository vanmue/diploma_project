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
  @Column('text')
  name: string;

  @OneToMany(() => ShopEntity, (shop) => shop.city)
  shops: ShopEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date = new Date();

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date = new Date();
}
