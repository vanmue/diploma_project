import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliverablesModule } from 'src/deliverables/deliverables.module';
import { MastersModule } from 'src/masters/masters.module';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { JsonService } from 'src/services/json/json.service';
import { ShopsModule } from 'src/shops/shops.module';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { AppointmentEntity } from './entites/appointment.entity';

@Module({
  providers: [AppointmentsService, JsonService],
  controllers: [AppointmentsController],
  imports: [
    TypeOrmModule.forFeature([AppointmentEntity]),
    DeliverablesModule,
    MastersModule,
    ProfilesModule,
    ShopsModule,
  ],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
