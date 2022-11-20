import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { JsonObject } from 'src/libs/src/models/JsonObject';
import { MastersService } from 'src/masters/masters.service';
import { JsonService } from 'src/services/json/json.service';
import { MasterEntity } from '../masters/entities/master.entity';
import { AppointmentsService } from './appointments.service';
import { AppointmentEntity } from './entites/appointment.entity';
import { CreateAppointmentEntity } from './entites/create-appointment.entity';
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
  @ApiResponse({ type: MasterEntity, isArray: true })
  async getAll(
    @Query() query: ListAllAppointmentsDto,
  ): Promise<JsonObject<MasterEntity[]>> {
    const data = await this.mastersService.findAppointments(query);
    return this.jsonService.data(data);
  }

  @Post()
  async create(
    @Body() dto: CreateAppointmentEntity,
  ): Promise<JsonObject<AppointmentEntity>> {
    const data = await this.appoinmentsService.create(dto);
    return this.jsonService.data(data);
  }
}
