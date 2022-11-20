import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { JsonService } from 'src/services/json/json.service';
import { CreateShopImageEntity } from './entities/create-shop-image.entity';
import { ShopImagesService } from './shop-images.service';

@Controller('shop-images')
@UseInterceptors(ClassSerializerInterceptor)
export class ShopImagesController {
  constructor(
    private shopImagesService: ShopImagesService,
    private readonly jsonService: JsonService,
  ) {}

  @Get()
  async getAll() {
    const data = await this.shopImagesService.findAll();
    return this.jsonService.data(data);
  }

  @Post()
  async create(@Body() dto: CreateShopImageEntity) {
    const data = await this.shopImagesService.create(dto);
    return this.jsonService.data(data);
  }
}
