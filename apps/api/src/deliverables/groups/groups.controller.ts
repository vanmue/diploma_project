import { Body, Controller, Get, Post } from '@nestjs/common';
import { GroupEntity } from './group.entity';
import { GroupsService } from './groups.service';

@Controller('groups')
export class GroupsController {
  constructor(private groupsService: GroupsService) {}
  @Get()
  async getGroups() {
    return await this.groupsService.findAll();
  }
  @Post()
  async create(@Body() groupDto: GroupEntity) {
    return await this.groupsService.create(groupDto);
  }
}
