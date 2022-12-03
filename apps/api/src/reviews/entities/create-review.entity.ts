import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { ReviewEntity } from './review.entity';

export class CreateReviewEntity extends PickType(ReviewEntity, [
  'review' as const,
  'score' as const,
]) {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  userId: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  appointmentId: number;
}
