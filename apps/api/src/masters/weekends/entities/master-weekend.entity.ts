import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { MasterEntity } from 'src/masters/entities/master.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('master_weekends')
export class MasterWeekendEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ApiProperty()
  @ManyToOne(() => MasterEntity, (master) => master.weekends)
  master: MasterEntity;

  @ApiProperty()
  @Column({ type: 'int' })
  weekday: number;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date = new Date();

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date = new Date();
}
