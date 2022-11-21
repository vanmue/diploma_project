import { ApiProperty, OmitType } from '@nestjs/swagger';
import { ArrayNotEmpty, IsInt, IsNotEmpty } from 'class-validator';
import { MasterEntity } from './master.entity';

export class CreateMasterEntity extends OmitType(MasterEntity, [
  'id' as const,
  'user' as const,
  'deliverables' as const,
  'shops' as const,
  'appointments' as const,
  'reviews' as const,
  'reviews_count' as const,
  'deliverable_groups' as const,
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
}
