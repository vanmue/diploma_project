import { Module } from '@nestjs/common';
import { ShopManagersService } from './shop-managers.service';

@Module({
  providers: [ShopManagersService],
  exports: [ShopManagersService],
  imports: [],
})
export class ShopManagersModule {}
