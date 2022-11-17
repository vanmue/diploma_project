import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { DeliverableEntity } from 'src/deliverables/deliverable.entity';
import { MasterEntity } from 'src/masters/master.entity';
import { ShopEntity } from 'src/shops/shop.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Exclusion,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('appointments')
@Exclusion(
  `USING GIST ("shopId" WITH =, "masterId" WITH =, TSTZRANGE("from", "to") WITH &&)`,
)
export class AppointmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @ManyToOne(() => ShopEntity)
  shop: ShopEntity;

  @IsNotEmpty()
  @ManyToOne(() => MasterEntity)
  master: MasterEntity;

  @IsNotEmpty()
  @ManyToOne(() => DeliverableEntity)
  deliverable: DeliverableEntity;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'text', nullable: true })
  comments: string;

  @IsNotEmpty()
  @Column({ type: 'timestamptz' })
  from: Date;

  @IsNotEmpty()
  @Column({ type: 'timestamptz' })
  to: Date;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date = new Date();

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date = new Date();
}
