import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShopAdvantageEntity } from './shop-advantage.entity';

@Injectable()
export class ShopAdvantagesService {
  constructor(
    @InjectRepository(ShopAdvantageEntity)
    private readonly shopAdvantageRepository: Repository<ShopAdvantageEntity>,
  ) {}
  async create(dto: ShopAdvantageEntity) {
    return await this.shopAdvantageRepository.save(dto);
  }
  async findAll() {
    return await this.shopAdvantageRepository.find();
  }
}
