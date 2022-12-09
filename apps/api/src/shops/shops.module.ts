import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliverableGroupsModule } from 'src/deliverables/groups/deliverable-groups.module';
import { MastersModule } from 'src/masters/masters.module';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { JsonService } from 'src/utils/services/json/json.service';
import { PaginationService } from 'src/utils/services/pagination/pagination.service';
import { ShopEntity } from './entities/shop.entity';
import { ShopsController } from './shops.controller';
import { ShopsService } from './shops.service';

@Module({
  controllers: [ShopsController],
  providers: [ShopsService, JsonService, PaginationService],
  imports: [
    TypeOrmModule.forFeature([ShopEntity]),
    DeliverableGroupsModule,
    forwardRef(() => MastersModule),
    ProfilesModule,
  ],
  exports: [ShopsService],
})
export class ShopsModule {}
