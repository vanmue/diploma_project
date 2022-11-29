import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { AppointmentsService } from 'src/appointments/appointments.service';
import { JsonObject } from 'src/libs/src/models/JsonObject';
import { JsonService } from 'src/services/json/json.service';
import { ListAllMastersDto } from './dto/list-all-masters.dto';
import { CreateMasterEntity } from './entities/create-master.entity';
import { MasterEntity } from './entities/master.entity';
import { UpdateMasterEntity } from './entities/update-master.entity';
import { MastersService } from './masters.service';

@Controller('masters')
@UseInterceptors(ClassSerializerInterceptor)
export class MastersController {
  constructor(
    private readonly mastersService: MastersService,
    private readonly jsonService: JsonService,
    private readonly appointmentsService: AppointmentsService,
  ) {}

  @Get()
  async getAll(@Query() query: ListAllMastersDto) {
    return await this.mastersService.findAllPaginated(query);
  }

  @Get(':id')
  async getMaster(@Param('id') id: number) {
    const data = await this.mastersService.findById(id);
    return this.jsonService.data(data);
  }

  @Get(':masterId/shops/:shopId/appointments')
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

  @Post()
  async create(
    @Body() dto: CreateMasterEntity,
  ): Promise<JsonObject<MasterEntity>> {
    const data = await this.mastersService.create(dto);
    return this.jsonService.data(data);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateMasterEntity) {
    const data = await this.mastersService.update(id, dto);
    return this.jsonService.data(data);
  }
}
