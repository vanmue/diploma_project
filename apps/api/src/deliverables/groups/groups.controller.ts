import { Body, Controller, Get, Post } from '@nestjs/common';
import { JsonService } from 'src/json/json.service';
import { JsonObject } from 'src/libs/src/models/JsonObject';
import { GroupEntity } from './group.entity';
import { GroupsService } from './groups.service';

@Controller('deliverable-groups')
export class GroupsController {
  constructor(
    private readonly groupsService: GroupsService,
    private readonly jsonService: JsonService,
  ) {}
  @Get()
  async getGroups(): Promise<JsonObject<GroupEntity[]>> {
    const data = await this.groupsService.findAll();
    return this.jsonService.data(data);
  }
  @Post()
  async create(
    @Body() groupDto: GroupEntity,
  ): Promise<JsonObject<GroupEntity>> {
    const data = await this.groupsService.create(groupDto);
    return this.jsonService.data(data);
  }
}
