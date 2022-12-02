import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('profiles')
export class ProfileEntity {
  @PrimaryGeneratedColumn({})
  @ApiProperty()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.profiles)
  @JoinColumn()
  user: UserEntity;

  @Column({ type: 'varchar' })
  profile_type: string;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date = new Date();

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date = new Date();
}
