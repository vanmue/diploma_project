import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AppointmentsService } from 'src/appointments/appointments.service';
import { AppointmentEntity } from 'src/appointments/entites/appointment.entity';
import { JsonService } from 'src/utils/services/json/json.service';

@Controller('users/:userId/appointments')
@UseInterceptors(ClassSerializerInterceptor)
export class UserAppointmentsController {
  constructor(
    private readonly jsonService: JsonService,
    private readonly appointmentsService: AppointmentsService,
  ) {}
  @Get()
  @ApiResponse({ type: AppointmentEntity, isArray: true })
  async getAll(@Param('userId') userId: number) {
    const data = await this.appointmentsService.findByCustomer(userId);
    return this.jsonService.data(data);
  }
}
