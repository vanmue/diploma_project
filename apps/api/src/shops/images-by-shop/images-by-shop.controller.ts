import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { JsonService } from 'src/services/json/json.service';
import { ShopImagesService } from 'src/shop-images/shop-images.service';

@Controller('shops/:id/images')
@UseInterceptors(ClassSerializerInterceptor)
export class ImagesByShopController {
  constructor(
    private shopImagesService: ShopImagesService,
    private readonly jsonService: JsonService,
  ) {}

  @Get()
  async getAll() {
    const data = await this.shopImagesService.findAll();
    return this.jsonService.data(data);
  }
}
