import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('files')
export class FileEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Column({ type: 'varchar', select: false })
  @ApiProperty()
  originalname: string;

  @IsNotEmpty()
  @IsString()
  @Column({ type: 'varchar' })
  @ApiProperty()
  path: string;

  @IsNotEmpty()
  @IsString()
  @Column({ type: 'varchar', select: false })
  @ApiProperty()
  mimetype: string;

  @IsNotEmpty()
  @IsString()
  @Column({ type: 'integer', select: false })
  @ApiProperty()
  size: number;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date = new Date();

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date = new Date();
}
