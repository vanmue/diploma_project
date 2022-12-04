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
import { JsonService } from 'src/utils/services/json/json.service';
import { CreateShopAdvantageEntity } from './entities/create-shop-advantage.entity';
import { UpdateShopAdvantageEntity } from './entities/update-shop-advantage.entity';
import { ShopAdvantagesService } from './shop-advantages.service';

@Controller('shop-advantages')
@UseInterceptors(ClassSerializerInterceptor)
export class ShopAdvantagesController {
  constructor(
    private readonly shopAdvantagesService: ShopAdvantagesService,
    private readonly jsonService: JsonService,
  ) {}

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const data = await this.shopAdvantagesService.remove(id);
    return this.jsonService.data(data);
  }

  @Get()
  async getAll() {
    const data = await this.shopAdvantagesService.findAll();
    return this.jsonService.data(data);
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    const data = await this.shopAdvantagesService.findById(id);
    return this.jsonService.data(data);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateShopAdvantageEntity,
  ) {
    const data = await this.shopAdvantagesService.update(id, dto);
    return this.jsonService.data(data);
  }

  @Post()
  async create(@Body() dto: CreateShopAdvantageEntity) {
    const data = await this.shopAdvantagesService.create(dto);
    return this.jsonService.data(data);
  }
}
