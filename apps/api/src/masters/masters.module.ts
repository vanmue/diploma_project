import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliverableGroupsModule } from 'src/deliverables/groups/deliverable-groups.module';
import { JsonService } from 'src/services/json/json.service';
import { MasterEntity } from './entities/master.entity';
import { MastersController } from './masters.controller';
import { MastersService } from './masters.service';
import { MasterReviewsModule } from './reviews/master-reviews.module';

@Module({
  controllers: [MastersController],
  providers: [MastersService, JsonService],
  imports: [
    MasterReviewsModule,
    TypeOrmModule.forFeature([MasterEntity]),
    DeliverableGroupsModule,
  ],
  exports: [MastersService],
})
export class MastersModule {}
