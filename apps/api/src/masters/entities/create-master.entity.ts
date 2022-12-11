import { ApiProperty, PickType } from '@nestjs/swagger';
import { ArrayNotEmpty, IsInt, IsNotEmpty } from 'class-validator';
import { MasterEntity } from './master.entity';

export class CreateMasterEntity extends PickType(MasterEntity, [
  'profession' as const,
  'description' as const,
  'working_start' as const,
  'working_end' as const,
]) {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  userId: number;

  @ArrayNotEmpty()
  @ApiProperty({ type: Number, isArray: true })
  shops: number[];

  @ArrayNotEmpty()
  @ApiProperty({ type: Number, isArray: true })
  deliverables: number[];

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  fileId: number;

  @ApiProperty({ type: 'number', isArray: true })
  weekends: number[];
}
