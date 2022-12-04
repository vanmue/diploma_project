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
import { JsonService } from 'src/utils/services/json/json.service';
import { CreateUserEntity } from './entities/create-user.entity';
import { UpdateUserEntity } from './entities/update-user.entity';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(
    private readonly usersServie: UsersService,
    private readonly jsonService: JsonService,
  ) {}

  @Get()
  @ApiResponse({ type: UserEntity, isArray: true })
  async getAll() {
    const data = await this.usersServie.findAll();
    return this.jsonService.data(data);
  }

  @Get(':id')
  @ApiResponse({ type: UserEntity, isArray: true })
  async getById(@Param('id') id: number) {
    const data = await this.usersServie.findMe(id);
    return this.jsonService.data(data);
  }

  @Post()
  @ApiResponse({ type: UserEntity })
  async create(@Body() dto: CreateUserEntity): Promise<JsonObject<UserEntity>> {
    const data = await this.usersServie.create(dto);
    return this.jsonService.data(data);
  }

  @Delete(':id')
  @ApiResponse({ type: UserEntity })
  async remove(@Param('id') id: number) {
    const data = await this.usersServie.remove(id);
    return this.jsonService.data(data);
  }
  @Patch(':id')
  @ApiResponse({ type: UserEntity })
  async update(@Param('id') id: number, @Body() dto: UpdateUserEntity) {
    const data = await this.usersServie.update(id, dto);
    return this.jsonService.data(data);
  }
}
