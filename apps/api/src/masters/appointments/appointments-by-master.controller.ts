import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { AppointmentsService } from 'src/appointments/appointments.service';
import { JsonService } from 'src/utils/services/json/json.service';

@Controller('masters/:masterId/appointments')
@UseInterceptors(ClassSerializerInterceptor)
export class AppointmentsByMasterController {
  constructor(
    private readonly appointmentsService: AppointmentsService,
    private readonly jsonService: JsonService,
  ) {}
  @Get()
  async getAll(@Param('masterId') masterId: number, @Query('date') date: Date) {
    const data = await this.appointmentsService.findByMaster(masterId, date);
    return this.jsonService.data(data);
  }
}
