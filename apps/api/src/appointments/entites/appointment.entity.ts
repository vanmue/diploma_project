import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { DeliverableEntity } from 'src/deliverables/entities/deliverable.entity';
import { MasterEntity } from 'src/masters/entities/master.entity';
import { ShopEntity } from 'src/shops/entities/shop.entity';
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
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ShopEntity, (shop) => shop.appointments)
  shop: ShopEntity;

  @ManyToOne(() => MasterEntity)
  master: MasterEntity;

  @ManyToOne(() => DeliverableEntity)
  deliverable: DeliverableEntity;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ type: 'varchar' })
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ type: 'varchar' })
  phone: string;

  @ApiProperty({ required: false })
  @Column({ type: 'text', nullable: true })
  comments?: string;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ type: 'timestamptz' })
  from: Date;

  @ApiProperty()
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
