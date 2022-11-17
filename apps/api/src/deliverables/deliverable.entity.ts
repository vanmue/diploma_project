import { IsNotEmpty } from 'class-validator';
import { MasterEntity } from 'src/masters/master.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude, Transform } from 'class-transformer';
import Decimal from 'decimal.js';
import decimalService from 'src/services/decimal/decimal.service';
import { DeliverableGroupEntity } from './groups/deliverable-group.entity';

export const UNIQUE_DELIVERABLE_NAME_CONSTRAINT =
  'unique_deliverable_name_constrtaint';

@Entity('deliverables')
@Unique(UNIQUE_DELIVERABLE_NAME_CONSTRAINT, ['name'])
export class DeliverableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ type: 'varchar' })
  name: string;

  @IsNotEmpty()
  @Column({
    type: 'decimal',
    precision: 18,
    scale: 2,
    transformer: decimalService,
  })
  @Transform(decimalService.toNumber)
  price: Decimal;

  @ManyToMany(() => MasterEntity, (master) => master.deliverables, {
    onDelete: 'RESTRICT',
    cascade: true,
  })
  masters: MasterEntity[];

  @IsNotEmpty()
  @ManyToOne(() => DeliverableGroupEntity, (group) => group.deliverables)
  deliverable_group: DeliverableGroupEntity;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date = new Date();

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date = new Date();
}
