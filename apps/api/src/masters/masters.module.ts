import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliverablesModule } from 'src/deliverables/deliverables.module';
import { DeliverableGroupsModule } from 'src/deliverables/groups/deliverable-groups.module';
import { FilesModule } from 'src/files/files.module';
import { ReviewsModule } from 'src/reviews/reviews.module';
import { JsonService } from 'src/services/json/json.service';
import { PaginationService } from 'src/services/pagination/pagination.service';
import { ShopsModule } from 'src/shops/shops.module';
import { UsersModule } from 'src/users/users.module';
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
    forwardRef(() => ShopsModule),
    DeliverablesModule,
    UsersModule,
    FilesModule,
  ],
  exports: [MastersService],
})
export class MastersModule {}
