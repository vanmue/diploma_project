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
import { JsonService } from 'src/services/json/json.service';
import { CreateShopImageEntity } from './entities/create-shop-image.entity';
import { ShopImageEntity } from './entities/shop-image.entity';
import { UpdateShopImageEntity } from './entities/update-shop-image.entity';
import { ShopImagesService } from './shop-images.service';

@Controller('shop-images')
@UseInterceptors(ClassSerializerInterceptor)
export class ShopImagesController {
  constructor(
    private readonly shopImagesService: ShopImagesService,
    private readonly jsonService: JsonService,
  ) {}
  @Get()
  @ApiResponse({ type: ShopImageEntity, isArray: true })
  async getAll() {
    const data = await this.shopImagesService.findAll();
    return this.jsonService.data(data);
  }
  @Post()
  @ApiResponse({ type: ShopImageEntity })
  async create(
    @Body() dto: CreateShopImageEntity,
  ): Promise<JsonObject<ShopImageEntity>> {
    const data = await this.shopImagesService.create(dto);
    return this.jsonService.data(data);
  }
  @Delete(':id')
  @ApiResponse({ type: ShopImageEntity })
  async remove(@Param('id') id: number) {
    const data = await this.shopImagesService.remove(id);
    return this.jsonService.data(data);
  }
  @Patch(':id')
  @ApiResponse({ type: ShopImageEntity })
  async update(@Param('id') id: number, @Body() dto: UpdateShopImageEntity) {
    const data = await this.shopImagesService.update(id, dto);
    return this.jsonService.data(data);
  }
}
