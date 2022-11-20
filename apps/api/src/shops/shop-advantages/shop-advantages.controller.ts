import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { JsonService } from 'src/services/json/json.service';
import { CreateShopAdvantageEntity } from './entities/create-shop-advantage.entity';
import { ShopAdvantagesService } from './shop-advantages.service';

@Controller('shop-advantages')
@UseInterceptors(ClassSerializerInterceptor)
export class ShopAdvantagesController {
  constructor(
    private readonly shopAdvantagesService: ShopAdvantagesService,
    private readonly jsonService: JsonService,
  ) {}

  @Get()
  async getAll() {
    const data = await this.shopAdvantagesService.findAll();
    return this.jsonService.data(data);
  }

  @Post()
  async create(@Body() dto: CreateShopAdvantageEntity) {
    const data = await this.shopAdvantagesService.create(dto);
    return this.jsonService.data(data);
  }
}
