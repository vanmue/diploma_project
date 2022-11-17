import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliverableGroupsService } from 'src/deliverables/groups/deliverable-groups.service';
import { In, Repository } from 'typeorm';
import { ListAllDto } from './list-all.dto.interface';
import { ShopEntity } from './shop.entity';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(ShopEntity)
    private readonly shopRepository: Repository<ShopEntity>,
    private readonly deliverableGroupsService: DeliverableGroupsService,
  ) {}
  async create(dto: ShopEntity) {
    return await this.shopRepository.save(dto);
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
        masters: { deliverable_groups: { id: deliverable_group_id } },
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
