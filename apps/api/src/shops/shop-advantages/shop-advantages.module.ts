import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JsonService } from 'src/services/json/json.service';
import { ShopAdvantageEntity } from './shop-advantage.entity';
import { ShopAdvantagesController } from './shop-advantages.controller';
import { ShopAdvantagesService } from './shop-advantages.service';

@Module({
  controllers: [ShopAdvantagesController],
  providers: [ShopAdvantagesService, JsonService],
  imports: [TypeOrmModule.forFeature([ShopAdvantageEntity])],
})
export class ShopAdvantagesModule {}
