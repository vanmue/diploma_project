import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { JsonObject } from 'src/libs/src/models/JsonObject';
import { JsonService } from 'src/services/json/json.service';
import { DeliverableEntity } from './deliverable.entity';
import { DeliverablesService } from './deliverables.service';

@Controller('deliverables')
@UseInterceptors(ClassSerializerInterceptor)
export class DeliverablesController {
  constructor(
    private readonly deliverablesService: DeliverablesService,
    private readonly jsonService: JsonService,
  ) {}

  @Get()
  async getAll() {
    const data = await this.deliverablesService.findAll();
    return this.jsonService.data(data);
  }

  @Post()
  async create(
    @Body() dto: DeliverableEntity,
  ): Promise<JsonObject<DeliverableEntity>> {
    const data = await this.deliverablesService.create(dto);
    return this.jsonService.data(data);
  }
}