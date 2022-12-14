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

@Controller('masters/:masterId/shops/:shopId/appointments')
@UseInterceptors(ClassSerializerInterceptor)
export class AppointmentsByShopController {
  constructor(
    private readonly appointmentsService: AppointmentsService,
    private readonly jsonService: JsonService,
  ) {}
  @Get()
  async getAppointments(
    @Query('date') date: Date,
    @Param('masterId') masterId: number,
    @Param('shopId') shopId: number,
  ) {
    const data = await this.appointmentsService.findByMasterAndShop(
      masterId,
      shopId,
      date,
    );
    return this.jsonService.data(data);
  }
}
