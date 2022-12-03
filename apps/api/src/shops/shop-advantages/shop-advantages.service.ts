import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { copyKeys } from 'src/utils/copy-keys';
import { Repository } from 'typeorm';
import { CreateShopAdvantageEntity } from './entities/create-shop-advantage.entity';
import { ShopAdvantageEntity } from './entities/shop-advantage.entity';
import { UpdateShopAdvantageEntity } from './entities/update-shop-advantage.entity';

@Injectable()
export class ShopAdvantagesService {
  constructor(
    @InjectRepository(ShopAdvantageEntity)
    private readonly shopAdvantageRepository: Repository<ShopAdvantageEntity>,
  ) {}
  async create(dto: CreateShopAdvantageEntity) {
    return await this.saveValues(dto, new ShopAdvantageEntity());
  }
  async findAll() {
    return await this.shopAdvantageRepository.find();
  }
  async findById(id: number) {
    return await this.shopAdvantageRepository.findOneByOrFail({ id });
  }
  async remove(id: number) {
    const advantage = await this.findById(id);
    const toRemove = { ...advantage };
    return await this.shopAdvantageRepository.remove(toRemove);
  }
  async update(id: number, dto: UpdateShopAdvantageEntity) {
    const advantage = await this.findById(id);
    return await this.saveValues(dto, advantage);
  }
  private async saveValues(
    dto: CreateShopAdvantageEntity | UpdateShopAdvantageEntity,
    advantage: ShopAdvantageEntity,
  ) {
    const keys = ['name'];
    advantage = copyKeys(keys, dto, advantage);
    return await this.shopAdvantageRepository.save(advantage);
  }
}
