import { Body, Controller, Get, Post } from '@nestjs/common';
import { JsonObject } from 'src/libs/src/models/JsonObject';
import { JsonService } from 'src/services/json/json.service';
import { DeliverableGroupEntity } from './deliverable-group.entity';
import { DeliverableGroupsService } from './deliverable-groups.service';

@Controller('deliverable-groups')
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
    @Body() groupDto: DeliverableGroupEntity,
  ): Promise<JsonObject<DeliverableGroupEntity>> {
    const data = await this.groupsService.create(groupDto);
    return this.jsonService.data(data);
  }
}
