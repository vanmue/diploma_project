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
import { JsonService } from 'src/utils/services/json/json.service';
import { CreateMasterWeekendEntity } from './entities/create-master-weekend.entity';
import { UpdateMasterWeekendEntity } from './entities/update-master-weekend.entity';
import { MasterWeekendsService } from './master-weekends.service';

@Controller('master-weekends')
@UseInterceptors(ClassSerializerInterceptor)
export class MasterWeekendsController {
  constructor(
    private readonly masterWeekendsService: MasterWeekendsService,
    private readonly jsonService: JsonService,
  ) {}
  @Delete(':id')
  async remove(@Param('id') id: number) {
    const data = await this.masterWeekendsService.remove(id);
    return this.jsonService.data(data);
  }
  @Get()
  async getAll() {
    const data = await this.masterWeekendsService.findAll();
    return this.jsonService.data(data);
  }
  @Get(':id')
  async getOne(@Param('id') id: number) {
    const data = await this.masterWeekendsService.findById(id);
    return this.jsonService.data(data);
  }
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateMasterWeekendEntity,
  ) {
    const data = await this.masterWeekendsService.update(id, dto);
    return this.jsonService.data(data);
  }
  @Post()
  async create(@Body() dto: CreateMasterWeekendEntity) {
    const data = await this.masterWeekendsService.create(dto);
    return this.jsonService.data(data);
  }
}
