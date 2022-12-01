import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { DeliverableEntity } from 'src/deliverables/entities/deliverable.entity';
import { MasterEntity } from 'src/masters/entities/master.entity';
import { ReviewEntity } from 'src/reviews/entities/review.entity';
import { ShopEntity } from 'src/shops/entities/shop.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Exclusion,
  JoinColumn,
  ManyToOne,
  OneToMany,
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

  @OneToMany(() => ReviewEntity, (review) => review.appointment)
  reviews: ReviewEntity[];

  @ManyToOne(() => DeliverableEntity)
  deliverable: DeliverableEntity;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  customer: UserEntity;

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
