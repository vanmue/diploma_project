import { Body, Controller, Get, Post } from '@nestjs/common';
import { JsonObject } from 'src/libs/src/models/JsonObject';
import { JsonService } from 'src/services/json/json.service';
import { CreateUserEntity } from './entities/create-user.entity';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersServie: UsersService,
    private readonly jsonService: JsonService,
  ) {}

  @Get()
  async getAll() {
    const data = await this.usersServie.findAll();
    return this.jsonService.data(data);
  }

  @Post()
  async create(@Body() dto: CreateUserEntity): Promise<JsonObject<UserEntity>> {
    const data = await this.usersServie.create(dto);
    return this.jsonService.data(data);
  }
}
