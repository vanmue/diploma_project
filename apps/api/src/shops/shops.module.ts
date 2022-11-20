import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliverableGroupsModule } from 'src/deliverables/groups/deliverable-groups.module';
import { JsonService } from 'src/services/json/json.service';
import { ShopEntity } from './entities/shop.entity';
import { ShopImagesModule } from './shop-images/shop-images.module';
import { ShopsController } from './shops.controller';
import { ShopsService } from './shops.service';

@Module({
  controllers: [ShopsController],
  providers: [ShopsService, JsonService],
  imports: [
    TypeOrmModule.forFeature([ShopEntity]),
    DeliverableGroupsModule,
    ShopImagesModule,
  ],
})
export class ShopsModule {}
