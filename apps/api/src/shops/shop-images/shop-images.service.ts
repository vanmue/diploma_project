import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShopEntity } from '../entities/shop.entity';
import { CreateShopImageEntity } from './entities/create-shop-image.entity';
import { ShopImageEntity } from './entities/shop-image.entity';

@Injectable()
export class ShopImagesService {
  constructor(
    @InjectRepository(ShopImageEntity)
    private readonly shopImageRepository: Repository<ShopImageEntity>,
  ) {}
  async create(dto: CreateShopImageEntity) {
    const { shopId } = dto;

    const shop = new ShopEntity();
    shop.id = shopId;
    return await this.shopImageRepository.save({ ...dto, shop });
  }
  async findAll() {
    return await this.shopImageRepository.find();
  }
}
