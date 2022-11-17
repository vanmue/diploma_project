import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { JsonObject } from 'src/libs/src/models/JsonObject';
import { JsonService } from 'src/services/json/json.service';
import { ListAllMastersDto } from './list-all-masters-dto';
import { MasterEntity } from './master.entity';
import { MastersService } from './masters.service';

@Controller('masters')
export class MastersController {
  constructor(
    private readonly mastersService: MastersService,
    private readonly jsonService: JsonService,
  ) {}

  @Get()
  async getAll(@Query() query: ListAllMastersDto) {
    const data = await this.mastersService.findAll(query);
    return this.jsonService.data(data);
  }

  @Post()
  async create(@Body() dto: MasterEntity): Promise<JsonObject<MasterEntity>> {
    const data = await this.mastersService.create(dto);
    return this.jsonService.data(data);
  }
}
