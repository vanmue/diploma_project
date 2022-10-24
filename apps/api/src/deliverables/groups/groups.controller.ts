import { Body, Controller, Get, Post } from '@nestjs/common';
import { JsonObject } from 'src/libs/src/models/JsonObject';
import { GroupEntity } from './group.entity';
import { GroupsService } from './groups.service';

@Controller('deliverable-groups')
export class GroupsController {
  constructor(private groupsService: GroupsService) {}
  @Get()
  async getGroups(): Promise<JsonObject<GroupEntity[]>> {
    const data = await this.groupsService.findAll();
    return { data };
  }
  @Post()
  async create(
    @Body() groupDto: GroupEntity,
  ): Promise<JsonObject<GroupEntity>> {
    const data = await this.groupsService.create(groupDto);
    return { data };
  }
}
