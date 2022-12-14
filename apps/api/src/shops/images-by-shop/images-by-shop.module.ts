import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopImagesModule } from 'src/shop-images/shop-images.module';
import { JsonService } from 'src/utils/services/json/json.service';
import { ShopImageEntity } from '../../shop-images/entities/shop-image.entity';
import { ImagesByShopController } from './images-by-shop.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ShopImageEntity]), ShopImagesModule],
  providers: [JsonService],
  controllers: [ImagesByShopController],
})
export class ImagesByShopModule {}
