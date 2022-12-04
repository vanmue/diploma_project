import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from 'src/cities/entities/city.entity';
import { DeliverableGroupsService } from 'src/deliverables/groups/deliverable-groups.service';
import { copyKeys } from 'src/utils/helpers/copy-keys';
import { PaginationService } from 'src/utils/services/pagination/pagination.service';
import { In, Repository } from 'typeorm';
import { CreateShopEntity } from './entities/create-shop.entity';
import { ShopEntity } from './entities/shop.entity';
import { UpdateShopEntity } from './entities/update-shop.entity';
import { ListAllDto } from './query-dto/list-all.dto';
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
    return await this.saveValues(dto, new ShopEntity());
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
        images: {
          file: true,
        },
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
    return await this.shopRepository.findOneByOrFail({ id });
  }

  async findInfoById(id: number) {
    const shop = await this.shopRepository.findOneOrFail({
      where: {
        id,
      },
      relations: {
        city: true,
        images: {
          file: true,
        },
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

  async remove(id: number) {
    const shop = await this.findById(id);
    const toRemove = { ...shop };
    await this.shopRepository.remove(shop);
    return toRemove;
  }

  async update(id: number, dto: UpdateShopEntity) {
    const shop = await this.findById(id);
    return await this.saveValues(dto, shop);
  }

  private async saveValues(
    dto: CreateShopEntity | UpdateShopEntity,
    shop: ShopEntity,
  ) {
    const keys = [
      'name',
      'address',
      'working_time',
      'working_start',
      'working_end',
      'phone',
      'center_longtitude',
      'center_latitude',
      'label_longtitude',
      'label_latitude',
      'zoom',
    ];
    shop = copyKeys(keys, dto, shop);
    const { cityId, advantages } = dto;
    if (cityId) {
      const city = new CityEntity();
      city.id = cityId;
      shop.city = city;
    }
    if (advantages) {
      shop.advantages = advantages.map((id) => {
        const adv = new ShopAdvantageEntity();
        adv.id = id;
        return adv;
      });
    }
    return await this.shopRepository.save(shop);
  }
}
