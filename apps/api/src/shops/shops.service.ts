import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from 'src/cities/entities/city.entity';
import { DeliverableGroupsService } from 'src/deliverables/groups/deliverable-groups.service';
import { PaginationService } from 'src/services/pagination/pagination.service';
import { In, Repository } from 'typeorm';
import { ListAllDto } from './dto/list-all.dto';
import { CreateShopEntity } from './entities/create-shop.entity';
import { ShopEntity } from './entities/shop.entity';
import { ShopAdvantageEntity } from './shop-advantages/entities/shop-advantage.entity';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(ShopEntity)
    private readonly shopRepository: Repository<ShopEntity>,
    private readonly deliverableGroupsService: DeliverableGroupsService,
    private readonly paginationService: PaginationService,
  ) {}
  async create(dto: CreateShopEntity) {
    const { cityId, advantages } = dto;

    const city = new CityEntity();
    city.id = cityId;

    const advs = advantages?.map((id) => {
      const adv = new ShopAdvantageEntity();
      adv.id = id;
      return adv;
    });

    return await this.shopRepository.save({ ...dto, city, advantages: advs });
  }
  async findAllPaginated(query?: ListAllDto) {
    const { city_id, deliverable_group_id, limit, page } = query;

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

    const paginationOptions = this.paginationService.getPaginationOptions(
      limit,
      page,
    );

    const [shopsByQuery, shopsTotal] = await this.shopRepository.findAndCount({
      where,
      ...paginationOptions,
      order: { id: 'ASC' },
    });

    const ids = shopsByQuery.map((shop) => shop.id);

    const shops = await this.shopRepository.find({
      where: {
        id: In(ids),
      },
      relations: {
        advantages: true,
        city: true,
        images: true,
      },
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

    return p.then(() =>
      this.paginationService.getJsonObject<ShopEntity[]>(
        shops,
        shopsTotal,
        limit,
        page,
      ),
    );
  }

  async findById(id: number) {
    const shop = await this.shopRepository.findOneOrFail({
      where: {
        id,
      },
      relations: {
        city: true,
        images: true,
        advantages: true,
      },
    });

    shop.deliverable_groups = await this.deliverableGroupsService.findByShop(
      shop.id,
    );
    return shop;
  }

  async findByIds(ids: number[]) {
    return await this.shopRepository.findBy({ id: In(ids) });
  }
}
