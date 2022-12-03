import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { JsonService } from 'src/services/json/json.service';
import { ReviewEntity } from './entities/review.entity';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewEntity]), ProfilesModule],
  providers: [ReviewsService, JsonService],
  controllers: [ReviewsController],
  exports: [ReviewsService],
})
export class ReviewsModule {}
