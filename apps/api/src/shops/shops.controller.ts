import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { JsonObject } from 'src/libs/src/models/JsonObject';
import { JsonService } from 'src/services/json/json.service';
import { ListAllDto } from './list-all.dto.interface';
import { ShopEntity } from './shop.entity';
import { ShopsService } from './shops.service';

@Controller('shops')
@UseInterceptors(ClassSerializerInterceptor)
export class ShopsController {
  constructor(
    private readonly shopsService: ShopsService,
    private readonly jsonService: JsonService,
  ) {}

  @Get()
  async getAll(@Query() query: ListAllDto) {
    const data = await this.shopsService.findAll(query);
    return this.jsonService.data(data);
  }

  @Post()
  async create(@Body() dto: ShopEntity): Promise<JsonObject<ShopEntity>> {
    const data = await this.shopsService.create(dto);
    return this.jsonService.data(data);
  }
}
