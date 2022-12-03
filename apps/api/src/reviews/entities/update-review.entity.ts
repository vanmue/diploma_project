import { PartialType } from '@nestjs/swagger';
import { CreateReviewEntity } from './create-review.entity';

export class UpdateReviewEntity extends PartialType(CreateReviewEntity) {}
