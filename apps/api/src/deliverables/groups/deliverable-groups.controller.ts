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
import { DeliverableGroupsService } from './deliverable-groups.service';
import { CreateDeliverableGroupEntity } from './entities/create-deliverable-group.entity';
import { DeliverableGroupEntity } from './entities/deliverable-group.entity';

@Controller('deliverable-groups')
@UseInterceptors(ClassSerializerInterceptor)
export class DeliverableGroupsController {
  constructor(
    private readonly groupsService: DeliverableGroupsService,
    private readonly jsonService: JsonService,
  ) {}
  @Get()
  async getAll(): Promise<JsonObject<DeliverableGroupEntity[]>> {
    const data = await this.groupsService.findAll();
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
