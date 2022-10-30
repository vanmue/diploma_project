import { IsInt, IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

const UNIQUE_GROUP_NAME_CONSTRAINT = 'unique_GROUP_name_constrtaint';

@Entity('deliverable_groups')
@Unique(UNIQUE_GROUP_NAME_CONSTRAINT, ['name'])
export class GroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsInt()
  @Column('int', { comment: 'порядковый номер в списке услуг' })
  index: number; // порядковый номер в списке услуг

  @IsNotEmpty()
  @Column('text')
  name: string;

  @IsNotEmpty()
  @Column('text', { comment: 'файл изображения' })
  image: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date = new Date();

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date = new Date();
}
