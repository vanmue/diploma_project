import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { ReviewEntity } from './review.entity';

export class CreateReviewEntity extends OmitType(ReviewEntity, [
  'id' as const,
  'author' as const,
  'appointment' as const,
]) {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  authorId: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  appointmentId: number;
}
