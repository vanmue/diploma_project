import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('deliverable_groups')
export class GroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column('int')
  index: number; // порядковый номер в списке услуг

  @IsNotEmpty()
  @Column('text')
  name: string;

  @IsNotEmpty()
  @Column('text')
  image: string;
}
