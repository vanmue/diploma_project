import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { JsonObject } from 'src/libs/src/models/JsonObject';
import { JsonService } from 'src/utils/services/json/json.service';
import { CreateReviewEntity } from './entities/create-review.entity';
import { ReviewEntity } from './entities/review.entity';
import { UpdateReviewEntity } from './entities/update-review.entity';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
@UseInterceptors(ClassSerializerInterceptor)
export class ReviewsController {
  constructor(
    private readonly reviewService: ReviewsService,
    private readonly jsonService: JsonService,
  ) {}
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<JsonObject<ReviewEntity>> {
    const data = await this.reviewService.remove(id);
    return this.jsonService.data(data);
  }

  @Get()
  async getAll(): Promise<JsonObject<ReviewEntity[]>> {
    const data = await this.reviewService.findAll();
    return this.jsonService.data(data);
  }
  @Get(':id')
  async getById(@Param('id') id: number): Promise<JsonObject<ReviewEntity>> {
    const data = await this.reviewService.findById(id);
    return this.jsonService.data(data);
  }
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateReviewEntity,
  ): Promise<JsonObject<ReviewEntity>> {
    const data = await this.reviewService.update(id, dto);
    return this.jsonService.data(data);
  }
  @Post()
  async create(
    @Body() dto: CreateReviewEntity,
  ): Promise<JsonObject<ReviewEntity>> {
    const data = await this.reviewService.create(dto);
    return this.jsonService.data(data);
  }
}
