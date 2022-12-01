import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { JsonObject } from 'src/libs/src/models/JsonObject';
import { MastersService } from 'src/masters/masters.service';
import { JsonService } from 'src/services/json/json.service';
import { CreateShopEntity } from './entities/create-shop.entity';
import { ShopEntity } from './entities/shop.entity';
import { ListAllDto } from './query-dto/list-all.dto';
import { ListByShopDto } from './query-dto/list-by-shop.dto';
import { ShopsService } from './shops.service';

@Controller('shops')
@UseInterceptors(ClassSerializerInterceptor)
export class ShopsController {
  constructor(
    private readonly shopsService: ShopsService,
    private readonly jsonService: JsonService,
    private readonly mastersService: MastersService,
  ) {}

  @Get()
  @ApiResponse({ type: ShopEntity, isArray: true })
  async getAll(@Query() query: ListAllDto) {
    return await this.shopsService.findAllPaginated(query);
  }

  @Get(':id')
  @ApiResponse({ type: ShopEntity })
  async getById(@Param('id') id: number) {
    const data = await this.shopsService.findInfoById(id);
    return this.jsonService.data(data);
  }

  @Get(':id/masters')
  @ApiResponse({ type: ShopEntity })
  async getMastersById(@Param('id') id: number, @Query() query: ListByShopDto) {
    return await this.mastersService.findByShopIdPaginated(id, query);
  }

  @Post()
  @ApiResponse({ type: ShopEntity })
  async create(@Body() dto: CreateShopEntity): Promise<JsonObject<ShopEntity>> {
    const data = await this.shopsService.create(dto);
    return this.jsonService.data(data);
  }
}
