import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JsonService } from 'src/services/json/json.service';
import { ShopImageEntity } from './entities/shop-image.entity';
import { ShopImagesService } from './shop-images.service';
import { ShopImagesController } from './shop-images.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ShopImageEntity])],
  providers: [ShopImagesService, JsonService],
  controllers: [ShopImagesController],
})
export class ShopImagesModule {}
