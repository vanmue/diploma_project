import { IsNotEmpty } from 'class-validator';
import { DeliverableGroupEntity } from 'src/deliverables/groups/deliverable-group.entity';
import { ShopEntity } from 'src/shops/shop.entity';
import { UserEntity } from 'src/users/user.entity';
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
import { MasterReviewEntity } from './reviews/master-review.entity';

@Entity('masters')
export class MasterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @OneToOne(() => UserEntity, undefined, {
    onDelete: 'RESTRICT',
    cascade: true,
  })
  @JoinColumn()
  user: UserEntity;

  @IsNotEmpty()
  @Column({ type: 'varchar' })
  profession: string;

  @IsNotEmpty()
  @Column('text')
  description: string;

  @IsNotEmpty()
  @ManyToMany(
    () => DeliverableGroupEntity,
    (deliverableGroup) => deliverableGroup.masters,
  )
  @JoinTable()
  deliverable_groups: DeliverableGroupEntity[];

  @IsNotEmpty()
  @ManyToMany(() => ShopEntity, (shop) => shop.masters)
  @JoinTable()
  shops: ShopEntity[];

  @IsNotEmpty()
  @Column('int')
  score: number;

  @Column({ type: 'varchar' })
  img: string;

  @OneToMany(() => MasterReviewEntity, (review) => review.master)
  reviews: MasterReviewEntity[];

  reviews_count: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date = new Date();

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date = new Date();
}
