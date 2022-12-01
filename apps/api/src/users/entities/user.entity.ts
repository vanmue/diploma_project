import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { FileEntity } from 'src/files/entities/file.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

export const UNIQUE_EMAIL_CONSTRAINT = 'unique_email_constrtaint';

@Entity('users')
@Unique(UNIQUE_EMAIL_CONSTRAINT, ['email'])
export class UserEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @Column({ type: 'varchar' })
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @Column({ type: 'varchar' })
  @ApiProperty()
  surname: string;

  @ApiProperty()
  @ManyToOne(() => FileEntity, undefined, { eager: true })
  avatar: FileEntity;

  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar', select: false })
  @ApiProperty({ required: true })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar', select: false })
  @ApiProperty({ required: true })
  password: string;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date = new Date();

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date = new Date();
}
