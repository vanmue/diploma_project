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
import { JsonObject } from 'src/libs/src/models/JsonObject';
import { JsonService } from 'src/services/json/json.service';
import { DeliverablesService } from './deliverables.service';
import { CreateDeliverableEntity } from './entities/create-deliverable.entity';
import { DeliverableEntity } from './entities/deliverable.entity';
import { UpdateDeliverableEntity } from './entities/update-deliverable.entity';

@Controller('deliverables')
@UseInterceptors(ClassSerializerInterceptor)
export class DeliverablesController {
  constructor(
    private readonly deliverablesService: DeliverablesService,
    private readonly jsonService: JsonService,
  ) {}

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const data = await this.deliverablesService.remove(id);
    return this.jsonService.data(data);
  }

  @Get()
  async getAll() {
    const data = await this.deliverablesService.findAll();
    return this.jsonService.data(data);
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    const data = await this.deliverablesService.findById(id);
    return this.jsonService.data(data);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateDeliverableEntity) {
    const data = await this.deliverablesService.update(id, dto);
    return this.jsonService.data(data);
  }

  @Post()
  async create(
    @Body() dto: CreateDeliverableEntity,
  ): Promise<JsonObject<DeliverableEntity>> {
    const data = await this.deliverablesService.create(dto);
    return this.jsonService.data(data);
  }
}
