import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
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
import { UpdateAppointmentEntity } from './entites/update-appointment.entity';

@Controller('appointments')
@UseInterceptors(ClassSerializerInterceptor)
export class AppointmentsController {
  constructor(
    private readonly appointmentsService: AppointmentsService,
    private readonly jsonService: JsonService,
  ) {}

  @Get()
  @ApiResponse({ type: MasterEntity, isArray: true })
  async getAll(): Promise<JsonObject<AppointmentEntity[]>> {
    const data = await this.appointmentsService.findAll();
    return this.jsonService.data(data);
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    const data = await this.appointmentsService.findById(id);
    return this.jsonService.data(data);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateAppointmentEntity) {
    const data = await this.appointmentsService.update(id, dto);
    return this.jsonService.data(data);
  }
  @Delete(':id')
  async remove(@Param('id') id: number) {
    const data = await this.appointmentsService.remove(id);
    return this.jsonService.data(data);
  }
  @Post()
  async create(
    @Body() dto: CreateAppointmentEntity,
  ): Promise<JsonObject<AppointmentEntity>> {
    const data = await this.appointmentsService.create(dto);
    return this.jsonService.data(data);
  }
}
