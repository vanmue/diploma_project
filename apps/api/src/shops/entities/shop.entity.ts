import { ApiProperty, PickType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { AppointmentEntity } from 'src/appointments/entites/appointment.entity';
import { CityEntity } from 'src/cities/entities/city.entity';
import { DeliverableGroupEntity } from 'src/deliverables/groups/entities/deliverable-group.entity';
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
import { ShopImageEntity } from '../../shop-images/entities/shop-image.entity';
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
  @ApiProperty({
    type: () => PickType(CityEntity, ['id' as const, 'name' as const]),
  })
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
  @ApiProperty({ isArray: true })
  advantages: ShopAdvantageEntity[];

  @ManyToMany(() => MasterEntity, (master) => master.shops)
  @ApiProperty({ isArray: true })
  masters: MasterEntity[];

  @OneToMany(() => AppointmentEntity, (appointment) => appointment.shop)
  @ApiProperty({ isArray: true })
  appointments: AppointmentEntity[];

  @OneToMany(() => ShopImageEntity, (image) => image.shop, {
    onDelete: 'RESTRICT',
    cascade: true,
  })
  @ApiProperty({
    isArray: true,
    required: false,
  })
  images: ShopImageEntity[];

  @Column('float', {
    comment: 'долгота центра карты',
    nullable: true,
  })
  @ApiProperty()
  center_longtitude: number;

  @Column('float', {
    comment: 'широта центра карты',
    nullable: true,
  })
  @ApiProperty()
  center_latitude: number;

  @Column('float', {
    comment: 'долгота метки центра',
    nullable: true,
  })
  @ApiProperty()
  label_longtitude: number;

  @Column('float', {
    comment: 'широта метки центра',
    nullable: true,
  })
  @ApiProperty()
  label_latitude: number;

  @Column('int', { comment: 'масштаб карты', nullable: true })
  @ApiProperty()
  zoom: number;

  // услуги салона из услуг мастеров
  @ApiProperty({ isArray: true })
  deliverable_groups: DeliverableGroupEntity[];

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date = new Date();

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date = new Date();
}
