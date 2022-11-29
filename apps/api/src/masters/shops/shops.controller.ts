import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { AppointmentsService } from 'src/appointments/appointments.service';
import { JsonService } from 'src/services/json/json.service';

@Controller('masters/:masterId/shops')
@UseInterceptors(ClassSerializerInterceptor)
export class ShopsController {
  constructor(
    private readonly appointmentsService: AppointmentsService,
    private readonly jsonService: JsonService,
  ) {}
  @Get(':shopId/appointments')
  async getAppointments(
    @Query('date') date: Date,
    @Param('masterId') masterId: number,
    @Param('shopId') shopId: number,
  ) {
    const data = await this.appointmentsService.findByMaster(
      masterId,
      shopId,
      date,
    );
    return this.jsonService.data(data);
  }
}
