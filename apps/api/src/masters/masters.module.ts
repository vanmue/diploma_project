import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsModule } from 'src/appointments/appointments.module';
import { DeliverablesModule } from 'src/deliverables/deliverables.module';
import { FilesModule } from 'src/files/files.module';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { ReviewsModule } from 'src/reviews/reviews.module';
import { JsonService } from 'src/services/json/json.service';
import { PaginationService } from 'src/services/pagination/pagination.service';
import { MasterEntity } from './entities/master.entity';
import { MastersController } from './masters.controller';
import { MastersService } from './masters.service';
import { AppointmentsByMasterController } from './shops/appointments/appointments-by-master.controller';

@Module({
  controllers: [MastersController, AppointmentsByMasterController],
  providers: [MastersService, JsonService, PaginationService],
  imports: [
    TypeOrmModule.forFeature([MasterEntity]),
    forwardRef(() => AppointmentsModule),
    DeliverablesModule,
    FilesModule,
    ProfilesModule,
    ReviewsModule,
  ],
  exports: [MastersService],
})
export class MastersModule {}
