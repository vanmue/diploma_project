import { Exclude } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { DeliverableEntity } from '../deliverable.entity';

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

  @OneToMany(
    () => DeliverableEntity,
    (deliverable) => deliverable.deliverable_group,
  )
  deliverables: DeliverableEntity[];

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date = new Date();

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date = new Date();
}
