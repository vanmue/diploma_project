import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { MasterReviewEntity } from './master-review.entity';

export class CreateMasterReviewEntity extends OmitType(MasterReviewEntity, [
  'id' as const,
  'author' as const,
  'master' as const,
]) {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  authorId: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  masterId: number;
}
