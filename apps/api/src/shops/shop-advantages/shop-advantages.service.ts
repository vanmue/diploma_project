import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShopAdvantageEntity } from './entities/create-shop-advantage.entity';
import { ShopAdvantageEntity } from './entities/shop-advantage.entity';

@Injectable()
export class ShopAdvantagesService {
  constructor(
    @InjectRepository(ShopAdvantageEntity)
    private readonly shopAdvantageRepository: Repository<ShopAdvantageEntity>,
  ) {}
  async create(dto: CreateShopAdvantageEntity) {
    return await this.shopAdvantageRepository.save(dto);
  }
  async findAll() {
    return await this.shopAdvantageRepository.find();
  }
}
