import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('shop')
export class ShopEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
