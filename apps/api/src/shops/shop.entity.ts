import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { AppointmentEntity } from 'src/appointments/appointment.entity';
import { CityEntity } from 'src/cities/city.entity';
import { DeliverableGroupEntity } from 'src/deliverables/groups/deliverable-group.entity';
import { MasterEntity } from 'src/masters/master.entity';
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
import { ShopAdvantageEntity } from './shop-advantages/shop-advantage.entity';

@Entity('shops')
export class ShopEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ type: 'varchar' })
  name: string;

  @IsNotEmpty()
  @ManyToOne(() => CityEntity, (city) => city.shops)
  city: CityEntity;

  @IsNotEmpty()
  @Column({ type: 'varchar' })
  address: string;

  @IsNotEmpty()
  @Column({ type: 'varchar' })
  working_time: string;

  @IsNotEmpty()
  @Column({ type: 'int' })
  working_start: number;

  @IsNotEmpty()
  @Column({ type: 'int' })
  working_end: number;

  @IsNotEmpty()
  @Column({ type: 'varchar' })
  phone: string;

  @ManyToMany(() => ShopAdvantageEntity, (advantage) => advantage.shops)
  @JoinTable()
  advantages: ShopAdvantageEntity[];

  @ManyToMany(() => MasterEntity, (master) => master.shops)
  masters: MasterEntity[];

  @OneToMany(() => AppointmentEntity, (appointment) => appointment.shop)
  appointments: AppointmentEntity[];

  @Column('float', {
    comment: 'долгота центра карты',
    nullable: true,
    select: false,
  })
  center_longtitude: number;

  @Column('float', {
    comment: 'широта центра карты',
    nullable: true,
    select: false,
  })
  center_latitude: number;

  @Column('float', {
    comment: 'долгота метки центра',
    nullable: true,
    select: false,
  })
  label_longtitude: number;

  @Column('float', {
    comment: 'широта метки центра',
    nullable: true,
    select: false,
  })
  label_latitude: number;

  @Column('int', { comment: 'масштаб карты', nullable: true, select: false })
  zoom: number;

  // услуги салона из услуг мастеров
  deliverable_groups: DeliverableGroupEntity[];

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date = new Date();

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date = new Date();
}
