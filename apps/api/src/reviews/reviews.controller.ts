import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { JsonObject } from 'src/libs/src/models/JsonObject';
import { JsonService } from 'src/services/json/json.service';
import { CreateReviewEntity } from './entities/create-review.entity';
import { ReviewEntity } from './entities/review.entity';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
@UseInterceptors(ClassSerializerInterceptor)
export class ReviewsController {
  constructor(
    private readonly reviewService: ReviewsService,
    private readonly jsonService: JsonService,
  ) {}
  @Post()
  async create(
    @Body() dto: CreateReviewEntity,
  ): Promise<JsonObject<ReviewEntity>> {
    const data = await this.reviewService.create(dto);
    return this.jsonService.data(data);
  }

  @Get()
  async getAll(): Promise<JsonObject<ReviewEntity[]>> {
    const data = await this.reviewService.findAll();
    return this.jsonService.data(data);
  }
}
