import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { JsonService } from 'src/utils/services/json/json.service';
import { ProfileTypesService } from './profile-types.service';

@Controller('profile-types')
@UseInterceptors(ClassSerializerInterceptor)
export class ProfileTypesController {
  constructor(
    private readonly jsonService: JsonService,
    private readonly profileTypesService: ProfileTypesService,
    private readonly usersService: UsersService,
  ) {}
  @Get()
  @ApiResponse({ type: 'array' })
  async getAll() {
    const data = await this.profileTypesService.findAll();
    return this.jsonService.data(data);
  }
  @Get(':id/users')
  async getUsers(@Param('id') id: string) {
    const data = await this.usersService.findByProfileType(id);
    return this.jsonService.data(data);
  }
}
