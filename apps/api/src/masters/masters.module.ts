import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliverableGroupsModule } from 'src/deliverables/groups/deliverable-groups.module';
import { ReviewsModule } from 'src/reviews/reviews.module';
import { JsonService } from 'src/services/json/json.service';
import { PaginationService } from 'src/services/pagination/pagination.service';
import { MasterEntity } from './entities/master.entity';
import { MastersController } from './masters.controller';
import { MastersService } from './masters.service';

@Module({
  controllers: [MastersController],
  providers: [MastersService, JsonService, PaginationService],
  imports: [
    TypeOrmModule.forFeature([MasterEntity]),
    DeliverableGroupsModule,
    ReviewsModule,
  ],
  exports: [MastersService],
})
export class MastersModule {}
