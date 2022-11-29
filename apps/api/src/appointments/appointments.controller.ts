import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { JsonObject } from 'src/libs/src/models/JsonObject';
import { JsonService } from 'src/services/json/json.service';
import { MasterEntity } from '../masters/entities/master.entity';
import { AppointmentsService } from './appointments.service';
import { AppointmentEntity } from './entites/appointment.entity';
import { CreateAppointmentEntity } from './entites/create-appointment.entity';

@Controller('appointments')
@UseInterceptors(ClassSerializerInterceptor)
export class AppointmentsController {
  constructor(
    private readonly appoinmentsService: AppointmentsService,
    private readonly jsonService: JsonService,
  ) {}

  @Get()
  @ApiResponse({ type: MasterEntity, isArray: true })
  async getAll(): Promise<JsonObject<AppointmentEntity[]>> {
    const data = await this.appoinmentsService.findAll();
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
