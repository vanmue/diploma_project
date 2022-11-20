import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { AppointmentEntity } from 'src/appointments/entites/appointment.entity';
import { CityEntity } from 'src/cities/entities/city.entity';
import { DeliverableGroupEntity } from 'src/deliverables/groups/deliverable-group.entity';
import { MasterEntity } from 'src/masters/entities/master.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ShopAdvantageEntity } from '../shop-advantages/entities/shop-advantage.entity';

@Entity('shops')
export class ShopEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @Column({ type: 'varchar' })
  @ApiProperty()
  name: string;

  @ManyToOne(() => CityEntity, (city) => city.shops)
  @ApiProperty({ type: () => CityEntity })
  city: CityEntity;

  @IsNotEmpty()
  @Column({ type: 'varchar' })
  @ApiProperty()
  address: string;

  @IsNotEmpty()
  @Column({ type: 'varchar' })
  @ApiProperty()
  working_time: string;

  @IsNotEmpty()
  @Column({ type: 'int' })
  @ApiProperty()
  working_start: number;

  @IsNotEmpty()
  @Column({ type: 'int' })
  @ApiProperty()
  working_end: number;

  @IsNotEmpty()
  @Column({ type: 'varchar' })
  @ApiProperty()
  phone: string;

  @ManyToMany(() => ShopAdvantageEntity, (advantage) => advantage.shops)
  @JoinTable()
  @ApiProperty()
  advantages: ShopAdvantageEntity[];

  @ManyToMany(() => MasterEntity, (master) => master.shops)
  @ApiProperty()
  masters: MasterEntity[];

  @OneToMany(() => AppointmentEntity, (appointment) => appointment.shop)
  @ApiProperty()
  appointments: AppointmentEntity[];

  @Column('float', {
    comment: 'долгота центра карты',
    nullable: true,
    select: false,
  })
  @ApiProperty()
  center_longtitude: number;

  @Column('float', {
    comment: 'широта центра карты',
    nullable: true,
    select: false,
  })
  @ApiProperty()
  center_latitude: number;

  @Column('float', {
    comment: 'долгота метки центра',
    nullable: true,
    select: false,
  })
  @ApiProperty()
  label_longtitude: number;

  @Column('float', {
    comment: 'широта метки центра',
    nullable: true,
    select: false,
  })
  @ApiProperty()
  label_latitude: number;

  @Column('int', { comment: 'масштаб карты', nullable: true, select: false })
  @ApiProperty()
  zoom: number;

  // услуги салона из услуг мастеров
  @ApiProperty()
  deliverable_groups: DeliverableGroupEntity[];

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date = new Date();

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date = new Date();
}
