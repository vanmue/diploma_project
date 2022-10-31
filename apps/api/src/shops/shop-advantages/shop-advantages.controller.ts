import { Body, Controller, Get, Post } from '@nestjs/common';
import { JsonService } from 'src/services/json/json.service';
import { ShopAdvantageEntity } from './shop-advantage.entity';
import { ShopAdvantagesService } from './shop-advantages.service';

@Controller('shop-advantages')
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
  async create(@Body() dto: ShopAdvantageEntity) {
    const data = await this.shopAdvantagesService.create(dto);
    return this.jsonService.data(data);
  }
}
