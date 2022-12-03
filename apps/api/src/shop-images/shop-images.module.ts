import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from 'src/files/files.module';
import { JsonService } from 'src/services/json/json.service';
import { ShopsModule } from 'src/shops/shops.module';
import { ShopImageEntity } from './entities/shop-image.entity';
import { ShopImagesController } from './shop-images.controller';
import { ShopImagesService } from './shop-images.service';

@Module({
  providers: [ShopImagesService, JsonService],
  imports: [
    TypeOrmModule.forFeature([ShopImageEntity]),
    FilesModule,
    ShopsModule,
  ],
  exports: [ShopImagesService],
  controllers: [ShopImagesController],
})
export class ShopImagesModule {}
