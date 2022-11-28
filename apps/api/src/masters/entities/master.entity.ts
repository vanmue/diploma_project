import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { AppointmentEntity } from 'src/appointments/entites/appointment.entity';
import { DeliverableEntity } from 'src/deliverables/entities/deliverable.entity';
import { DeliverableGroupEntity } from 'src/deliverables/groups/entities/deliverable-group.entity';
import { FileEntity } from 'src/files/entities/file.entity';
import { ReviewEntity } from 'src/reviews/entities/review.entity';
import { ShopEntity } from 'src/shops/entities/shop.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('masters')
export class MasterEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @OneToOne(() => UserEntity, undefined, {
    onDelete: 'RESTRICT',
    cascade: true,
    eager: true,
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

  @ManyToOne(() => FileEntity, undefined)
  @JoinColumn({ name: 'imgId', referencedColumnName: 'id' })
  @ApiProperty()
  img_file: FileEntity;

  @ApiProperty()
  reviews_scores_count: number;

  @ApiProperty()
  reviews_scores_sum: number;

  @ApiProperty()
  reviews_scores_avg: number;

  @ApiProperty({ isArray: true })
  deliverable_groups: DeliverableGroupEntity[];

  @ApiProperty({ isArray: true })
  reviews: ReviewEntity[];

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date = new Date();

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date = new Date();
}
