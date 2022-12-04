import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { ShopImagesService } from 'src/shop-images/shop-images.service';
import { JsonService } from 'src/utils/services/json/json.service';

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
