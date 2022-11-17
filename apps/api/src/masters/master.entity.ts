import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { DeliverableEntity } from 'src/deliverables/deliverable.entity';
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
  @ManyToMany(() => DeliverableEntity, (deliverable) => deliverable.masters)
  @JoinTable()
  deliverables: DeliverableEntity[];

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
  deliverable_groups: DeliverableGroupEntity[];

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date = new Date();

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date = new Date();
}
