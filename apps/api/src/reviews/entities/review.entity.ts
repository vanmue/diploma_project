import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';
import { AppointmentEntity } from 'src/appointments/entites/appointment.entity';
import { ProfileEntity } from 'src/profiles/entities/profile.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('reviews')
export class ReviewEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ManyToOne(() => ProfileEntity, undefined, {
    onDelete: 'RESTRICT',
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'profileId' })
  profile: ProfileEntity;

  @ManyToOne(() => AppointmentEntity)
  appointment: AppointmentEntity;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  @Column({ type: 'int', nullable: true })
  @ApiProperty({ required: false })
  score: number;

  @IsString()
  @ValidateIf((o) => o.review)
  @Column({ type: 'text', nullable: true })
  @ApiProperty({ required: false })
  review: string;

  @CreateDateColumn({ type: 'timestamp' })
  @Exclude()
  created_at: Date = new Date();

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date = new Date();
}
