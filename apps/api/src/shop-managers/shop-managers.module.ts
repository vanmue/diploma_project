import { Module } from '@nestjs/common';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { ShopManagersService } from './shop-managers.service';

@Module({
  providers: [ShopManagersService],
  exports: [ShopManagersService],
  imports: [ProfilesModule],
})
export class ShopManagersModule {}
