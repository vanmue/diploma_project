import { Module } from '@nestjs/common';
import { CustomersModule } from 'src/customers/customers.module';
import { MastersModule } from 'src/masters/masters.module';
import { ShopManagersModule } from 'src/shop-managers/shop-managers.module';
import { JsonService } from 'src/utils/services/json/json.service';
import { MeController } from './me.controller';
import { MeService } from './me.service';
import { ProfilesByMeController } from './profiles/profiles-by-me.controller';

@Module({
  controllers: [MeController, ProfilesByMeController],
  providers: [MeService, JsonService],
  imports: [MastersModule, CustomersModule, ShopManagersModule],
})
export class MeModule {}
