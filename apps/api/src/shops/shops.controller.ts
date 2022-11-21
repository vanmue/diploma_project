import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { JsonObject } from 'src/libs/src/models/JsonObject';
import { JsonService } from 'src/services/json/json.service';
import { CreateShopEntity } from './entities/create-shop.entity';
import { ShopEntity } from './entities/shop.entity';
import { ListAllDto } from './list-all.dto.interface';
import { ShopsService } from './shops.service';

@Controller('shops')
@UseInterceptors(ClassSerializerInterceptor)
export class ShopsController {
  constructor(
    private readonly shopsService: ShopsService,
    private readonly jsonService: JsonService,
  ) {}

  @Get()
  @ApiResponse({ type: ShopEntity, isArray: true })
  async getAll(@Query() query: ListAllDto) {
    return await this.shopsService.findAllPaginated(query);
  }

  @Post()
  async create(@Body() dto: CreateShopEntity): Promise<JsonObject<ShopEntity>> {
    const data = await this.shopsService.create(dto);
    return this.jsonService.data(data);
  }
}
