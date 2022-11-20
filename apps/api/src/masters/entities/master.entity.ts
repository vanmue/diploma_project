import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { AppointmentEntity } from 'src/appointments/entites/appointment.entity';
import { DeliverableEntity } from 'src/deliverables/entities/deliverable.entity';
import { DeliverableGroupEntity } from 'src/deliverables/groups/deliverable-group.entity';
import { ShopEntity } from 'src/shops/entities/shop.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MasterReviewEntity } from '../reviews/entities/master-review.entity';

@Entity('masters')
export class MasterEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @OneToOne(() => UserEntity, undefined, {
    onDelete: 'RESTRICT',
    cascade: true,
  })
  @JoinColumn()
  @ApiProperty()
  user: UserEntity;

  @IsNotEmpty()
  @Column({ type: 'varchar' })
  @ApiProperty()
  profession: string;

  @IsNotEmpty()
  @Column('text')
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @ManyToMany(() => DeliverableEntity, (deliverable) => deliverable.masters)
  @JoinTable()
  @ApiProperty({ isArray: true })
  deliverables: DeliverableEntity[];

  @IsNotEmpty()
  @ManyToMany(() => ShopEntity, (shop) => shop.masters)
  @JoinTable()
  @ApiProperty({ isArray: true })
  shops: ShopEntity[];

  @OneToMany(() => AppointmentEntity, (appointment) => appointment.master)
  @ApiProperty({ isArray: true })
  appointments: AppointmentEntity[];

  @IsNotEmpty()
  @Column('int')
  @ApiProperty()
  score: number;

  @Column({ type: 'varchar' })
  @ApiProperty()
  img: string;

  @OneToMany(() => MasterReviewEntity, (review) => review.master)
  @ApiProperty({ isArray: true })
  reviews: MasterReviewEntity[];

  @ApiProperty()
  reviews_count: number;

  @ApiProperty({ isArray: true })
  deliverable_groups: DeliverableGroupEntity[];

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date = new Date();

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date = new Date();
}
