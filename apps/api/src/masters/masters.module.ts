import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JsonService } from 'src/services/json/json.service';
import { MasterEntity } from './master.entity';
import { MastersController } from './masters.controller';
import { MastersService } from './masters.service';
import { MasterReviewsModule } from './reviews/master-reviews.module';

@Module({
  controllers: [MastersController],
  providers: [MastersService, JsonService],
  imports: [MasterReviewsModule, TypeOrmModule.forFeature([MasterEntity])],
})
export class MastersModule {}
