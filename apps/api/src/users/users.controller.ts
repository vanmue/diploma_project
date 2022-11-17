import { Body, Controller, Post } from '@nestjs/common';
import { JsonObject } from 'src/libs/src/models/JsonObject';
import { JsonService } from 'src/services/json/json.service';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersServie: UsersService,
    private readonly jsonService: JsonService,
  ) {}

  @Post()
  async create(@Body() dto: UserEntity): Promise<JsonObject<UserEntity>> {
    const data = await this.usersServie.create(dto);
    return this.jsonService.data(data);
  }
}
