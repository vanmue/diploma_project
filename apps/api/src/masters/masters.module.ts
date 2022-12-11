import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsModule } from 'src/appointments/appointments.module';
import { DeliverablesModule } from 'src/deliverables/deliverables.module';
import { FilesModule } from 'src/files/files.module';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { ReviewsModule } from 'src/reviews/reviews.module';
import { JsonService } from 'src/utils/services/json/json.service';
import { PaginationService } from 'src/utils/services/pagination/pagination.service';
import { AppointmentsByMasterController } from './appointments/appointments-by-master.controller';
import { DeliverablesByMasterController } from './deliverables/deliverables-by-master.controller';
import { MasterEntity } from './entities/master.entity';
import { MastersController } from './masters.controller';
import { MastersService } from './masters.service';
import { AppointmentsByShopController } from './shops/appointments/appointments-by-shop.controller';
import { MasterWeekendsModule } from './weekends/master-weekends.module';

@Module({
  controllers: [
    MastersController,
    AppointmentsByShopController,
    AppointmentsByMasterController,
    DeliverablesByMasterController,
  ],
  providers: [MastersService, JsonService, PaginationService],
  imports: [
    TypeOrmModule.forFeature([MasterEntity]),
    forwardRef(() => AppointmentsModule),
    DeliverablesModule,
    FilesModule,
    ProfilesModule,
    ReviewsModule,
    MasterWeekendsModule,
  ],
  exports: [MastersService],
})
export class MastersModule {}
