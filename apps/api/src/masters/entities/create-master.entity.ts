import { ApiProperty, PickType } from '@nestjs/swagger';
import { ArrayNotEmpty, IsInt, IsNotEmpty } from 'class-validator';
import { MasterEntity } from './master.entity';

export class CreateMasterEntity extends PickType(MasterEntity, [
  'profession' as const,
  'description' as const,
]) {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  profileId: number;

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
}
