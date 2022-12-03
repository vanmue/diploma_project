import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';
import { FileEntity } from 'src/files/entities/file.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { DeliverableEntity } from '../../entities/deliverable.entity';

const UNIQUE_GROUP_NAME_CONSTRAINT = 'unique_group_name_constrtaint';

@Entity('deliverable_groups')
@Unique(UNIQUE_GROUP_NAME_CONSTRAINT, ['name'])
export class DeliverableGroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  @Column('int', { comment: 'порядковый номер в списке услуг' })
  index: number; // порядковый номер в списке услуг

  @IsNotEmpty()
  @ApiProperty()
  @Column({ type: 'varchar' })
  name: string;

  @ApiProperty()
  @ManyToOne(() => FileEntity, undefined, { eager: true })
  image: FileEntity;

  @ApiProperty()
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
