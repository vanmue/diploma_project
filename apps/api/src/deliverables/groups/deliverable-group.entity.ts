import { IsInt, IsNotEmpty } from 'class-validator';
import { MasterEntity } from 'src/masters/master.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

const UNIQUE_GROUP_NAME_CONSTRAINT = 'unique_group_name_constrtaint';

@Entity('deliverable_groups')
@Unique(UNIQUE_GROUP_NAME_CONSTRAINT, ['name'])
export class DeliverableGroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsInt()
  @Column('int', { comment: 'порядковый номер в списке услуг' })
  index: number; // порядковый номер в списке услуг

  @IsNotEmpty()
  @Column({ type: 'varchar' })
  name: string;

  @IsNotEmpty()
  @Column({ type: 'varchar', comment: 'файл изображения' })
  image: string;

  @ManyToMany(() => MasterEntity, (master) => master.deliverable_groups, {
    onDelete: 'RESTRICT',
    cascade: true,
  })
  masters: MasterEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date = new Date();

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date = new Date();
}
