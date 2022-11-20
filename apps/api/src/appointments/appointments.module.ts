import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MastersModule } from 'src/masters/masters.module';
import { JsonService } from 'src/services/json/json.service';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { AppointmentEntity } from './entites/appointment.entity';

@Module({
  providers: [AppointmentsService, JsonService],
  controllers: [AppointmentsController],
  imports: [TypeOrmModule.forFeature([AppointmentEntity]), MastersModule],
})
export class AppointmentsModule {}
