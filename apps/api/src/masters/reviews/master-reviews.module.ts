import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JsonService } from 'src/services/json/json.service';
import { MasterReviewEntity } from './entities/master-review.entity';
import { MasterReviewsController } from './master-reviews.controller';
import { MasterReviewsService } from './master-reviews.service';

@Module({
  imports: [TypeOrmModule.forFeature([MasterReviewEntity])],
  providers: [MasterReviewsService, JsonService],
  controllers: [MasterReviewsController],
})
export class MasterReviewsModule {}
