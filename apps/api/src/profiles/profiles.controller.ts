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
import { ApiResponse } from '@nestjs/swagger';
import { JsonObject } from 'src/libs/src/models/JsonObject';
import { JsonService } from 'src/services/json/json.service';
import { CreateProfileEntity } from './entities/create-profile.entity';
import { ProfileEntity } from './entities/profile.entity';
import { UpdateProfileEntity } from './entities/update-profile.entity';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
@UseInterceptors(ClassSerializerInterceptor)
export class ProfilesController {
  constructor(
    private readonly profilesService: ProfilesService,
    private readonly jsonService: JsonService,
  ) {}
  @Get()
  @ApiResponse({ type: ProfileEntity, isArray: true })
  async getAll() {
    const data = await this.profilesService.findAll();
    return this.jsonService.data(data);
  }
  @Get(':id')
  @ApiResponse({ type: ProfileEntity, isArray: true })
  async getById(@Param('id') id: number) {
    const data = await this.profilesService.findById(id);
    return this.jsonService.data(data);
  }

  @Get('types')
  @ApiResponse({ type: 'array' })
  async getTypes() {
    const data = await this.profilesService.getTypes();
    return this.jsonService.data(data);
  }

  @Post()
  @ApiResponse({ type: ProfileEntity })
  async create(
    @Body() dto: CreateProfileEntity,
  ): Promise<JsonObject<ProfileEntity>> {
    const data = await this.profilesService.create(dto);
    return this.jsonService.data(data);
  }
  @Delete(':id')
  @ApiResponse({ type: ProfileEntity })
  async remove(@Param('id') id: number) {
    const data = await this.profilesService.remove(id);
    return this.jsonService.data(data);
  }
  @Patch(':id')
  @ApiResponse({ type: ProfileEntity })
  async update(@Param('id') id: number, @Body() dto: UpdateProfileEntity) {
    const data = await this.profilesService.update(id, dto);
    return this.jsonService.data(data);
  }
}
