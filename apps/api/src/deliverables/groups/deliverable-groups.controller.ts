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
import { JsonService } from 'src/utils/services/json/json.service';
import { DeliverableGroupsService } from './deliverable-groups.service';
import { CreateDeliverableGroupEntity } from './entities/create-deliverable-group.entity';
import { DeliverableGroupEntity } from './entities/deliverable-group.entity';
import { UpdateDeliverableGroupEntity } from './entities/update-deliverable-group.entity';

@Controller('deliverable-groups')
@UseInterceptors(ClassSerializerInterceptor)
export class DeliverableGroupsController {
  constructor(
    private readonly groupsService: DeliverableGroupsService,
    private readonly jsonService: JsonService,
  ) {}
  @Delete(':id')
  async remove(
    @Param('id') id: number,
  ): Promise<JsonObject<DeliverableGroupEntity>> {
    const data = await this.groupsService.remove(id);
    return this.jsonService.data(data);
  }

  @Get()
  async getAll(): Promise<JsonObject<DeliverableGroupEntity[]>> {
    const data = await this.groupsService.findAll();
    return this.jsonService.data(data);
  }
  @Get(':id')
  async getById(
    @Param('id') id: number,
  ): Promise<JsonObject<DeliverableGroupEntity>> {
    const data = await this.groupsService.findById(id);
    return this.jsonService.data(data);
  }
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateDeliverableGroupEntity,
  ): Promise<JsonObject<DeliverableGroupEntity>> {
    const data = await this.groupsService.update(id, dto);
    return this.jsonService.data(data);
  }
  @Post()
  async create(
    @Body() groupDto: CreateDeliverableGroupEntity,
  ): Promise<JsonObject<DeliverableGroupEntity>> {
    const data = await this.groupsService.create(groupDto);
    return this.jsonService.data(data);
  }
}
