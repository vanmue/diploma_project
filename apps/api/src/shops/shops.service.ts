import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from 'src/cities/entities/city.entity';
import { DeliverableGroupsService } from 'src/deliverables/groups/deliverable-groups.service';
import { In, Repository } from 'typeorm';
import { CreateShopEntity } from './entities/create-shop.entity';
import { ShopEntity } from './entities/shop.entity';
import { ListAllDto } from './list-all.dto.interface';
import { ShopAdvantageEntity } from './shop-advantages/entities/shop-advantage.entity';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(ShopEntity)
    private readonly shopRepository: Repository<ShopEntity>,
    private readonly deliverableGroupsService: DeliverableGroupsService,
  ) {}
  async create(dto: CreateShopEntity) {
    const { cityId, advantages: advantages } = dto;

    const city = new CityEntity();
    city.id = cityId;

    const advs = advantages?.map((id) => {
      const adv = new ShopAdvantageEntity();
      adv.id = id;
      return adv;
    });

    return await this.shopRepository.save({ ...dto, city, advantages: advs });
  }
  async findAll(query?: ListAllDto) {
    const { city_id, deliverable_group_id } = query;

    let where = {};
    if (city_id) {
      where = { ...where, city: { id: city_id } };
    }
    if (deliverable_group_id) {
      where = {
        ...where,
        masters: {
          deliverables: {
            deliverable_group: { id: deliverable_group_id },
          },
        },
      };
    }

    const shopsByQuery = await this.shopRepository.find({ where });

    const ids = shopsByQuery.map((shop) => shop.id);

    const shops = await this.shopRepository.find({
      where: {
        id: In(ids),
      },
      relations: ['city', 'advantages', 'masters'],
    });

    let p = Promise.resolve(null);
    shops.forEach((shop) => {
      p = p.then(() =>
        this.deliverableGroupsService
          .findByShop(shop.id)
          .then((deliverable_groups) => {
            shop.deliverable_groups = deliverable_groups;
          }),
      );
    });

    return p.then(() => shops);
  }
}
