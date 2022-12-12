import { Module } from '@nestjs/common';
import { CustomersModule } from 'src/customers/customers.module';
import { MastersModule } from 'src/masters/masters.module';
import { ShopsModule } from 'src/shops/shops.module';
import { JsonService } from 'src/utils/services/json/json.service';
import { MeController } from './me.controller';
import { MeService } from './me.service';
import { ProfilesByMeController } from './profiles/profiles-by-me.controller';

@Module({
  controllers: [MeController, ProfilesByMeController],
  providers: [MeService, JsonService],
  imports: [MastersModule, CustomersModule, ShopsModule],
})
export class MeModule {}
