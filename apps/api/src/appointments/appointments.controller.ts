import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { JsonObject } from 'src/libs/src/models/JsonObject';
import { MastersService } from 'src/masters/masters.service';
import { JsonService } from 'src/services/json/json.service';
import { AppointmentEntity } from './appointment.entity';
import { AppointmentsService } from './appointments.service';
import { ListAllAppointmentsDto } from './list-all-appointments.dto';

@Controller('appointments')
@UseInterceptors(ClassSerializerInterceptor)
export class AppointmentsController {
  constructor(
    private readonly appoinmentsService: AppointmentsService,
    private readonly mastersService: MastersService,
    private readonly jsonService: JsonService,
  ) {}

  @Get()
  async getAll(@Query() query: ListAllAppointmentsDto) {
    const data = await this.mastersService.findAppointments(query);
    return this.jsonService.data(data);
  }

  @Post()
  async create(
    @Body() dto: AppointmentEntity,
  ): Promise<JsonObject<AppointmentEntity>> {
    const data = await this.appoinmentsService.create(dto);
    return this.jsonService.data(data);
  }
}
