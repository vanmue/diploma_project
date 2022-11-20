import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MasterEntity } from '../../entities/master.entity';

@Entity('master_reviews')
export class MasterReviewEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @ManyToOne(() => UserEntity)
  author: UserEntity;

  @IsNotEmpty()
  @ManyToOne(() => MasterEntity, (master) => master.reviews)
  master: MasterEntity;

  @IsNotEmpty()
  @Column({ type: 'text' })
  @ApiProperty()
  review: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date = new Date();

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date = new Date();
}
