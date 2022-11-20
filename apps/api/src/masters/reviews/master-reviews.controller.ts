import { Body, Controller, Post } from '@nestjs/common';
import { JsonObject } from 'src/libs/src/models/JsonObject';
import { JsonService } from 'src/services/json/json.service';
import { CreateMasterReviewEntity } from './entities/create-master-review.entity';
import { MasterReviewEntity } from './entities/master-review.entity';
import { MasterReviewsService } from './master-reviews.service';

@Controller('master-reviews')
export class MasterReviewsController {
  constructor(
    private readonly reviewService: MasterReviewsService,
    private readonly jsonService: JsonService,
  ) {}
  @Post()
  async create(
    @Body() dto: CreateMasterReviewEntity,
  ): Promise<JsonObject<MasterReviewEntity>> {
    const data = await this.reviewService.create(dto);
    return this.jsonService.data(data);
  }
}
