import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { DeliverableEntity } from 'src/deliverables/entities/deliverable.entity';
import { MasterEntity } from 'src/masters/entities/master.entity';
import { ProfileEntity } from 'src/profiles/entities/profile.entity';
import { ReviewEntity } from 'src/reviews/entities/review.entity';
import { ShopEntity } from 'src/shops/entities/shop.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Exclusion,
  ManyToOne,
  OneToOne,
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

  @OneToOne(() => ReviewEntity, (review) => review.appointment)
  review: ReviewEntity;

  @ManyToOne(() => DeliverableEntity)
  deliverable: DeliverableEntity;

  @ApiProperty()
  @ManyToOne(() => ProfileEntity, undefined, {
    onDelete: 'RESTRICT',
    cascade: true,
    eager: true,
  })
  profile: ProfileEntity;

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
