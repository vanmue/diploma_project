import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListAllAppointmentsDto } from 'src/appointments/list-all-appointments.dto';
import { DeliverableEntity } from 'src/deliverables/entities/deliverable.entity';
import { DeliverableGroupsService } from 'src/deliverables/groups/deliverable-groups.service';
import { ReviewsService } from 'src/reviews/reviews.service';
import { PaginationService } from 'src/services/pagination/pagination.service';
import { ListByShopDto } from 'src/shops/dto/list-by-shop.dto';
import { ShopEntity } from 'src/shops/entities/shop.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { In, Raw, Repository } from 'typeorm';
import { CreateMasterEntity } from './entities/create-master.entity';
import { MasterEntity } from './entities/master.entity';
import { ListAllMastersDto } from './list-all-masters-dto';

@Injectable()
export class MastersService {
  constructor(
    @InjectRepository(MasterEntity)
    private readonly masterRepository: Repository<MasterEntity>,
    private readonly deliverableGroupsService: DeliverableGroupsService,
    private readonly paginationService: PaginationService,
    private readonly reviewService: ReviewsService,
  ) {}
  async create(dto: CreateMasterEntity) {
    const { userId, shops, deliverables } = dto;

    const user = new UserEntity();
    user.id = userId;

    const shopEntities = shops.map((id) => {
      const shop = new ShopEntity();
      shop.id = id;
      return shop;
    });

    const delivEntities = deliverables.map((d) => {
      const deliv = new DeliverableEntity();
      deliv.id = d;
      return deliv;
    });

    return await this.masterRepository.save({
      ...dto,
      user,
      shops: shopEntities,
      deliverables: delivEntities,
    });
  }

  async findByShopIdPaginated(shopId: number, query: ListByShopDto) {
    const { limit, page } = query;
    const paginationOptions = this.paginationService.getPaginationOptions(
      limit,
      page,
    );
    const [masters, mastersTotal] = await this.masterRepository.findAndCount({
      where: {
        shops: {
          id: shopId,
        },
      },
      ...paginationOptions,
      order: { id: 'ASC' },
      relations: {
        user: true,
        shops: true,
      },
    });

    let p = Promise.resolve(null);
    masters.forEach((master) => {
      p = p.then(() => {
        return this.reviewService
          .countAndSumByMaster(master.id)
          .then((reviewsScores) => {
            const { quantity, total, avg } = reviewsScores;
            master.reviews_scores_count = quantity;
            master.reviews_scores_sum = total;
            master.reviews_scores_avg = avg;
          });
      });
    });

    return p.then(() =>
      this.paginationService.getJsonObject<MasterEntity[]>(
        masters,
        mastersTotal,
        limit,
        page,
      ),
    );
  }

  async findAllPaginated(query?: ListAllMastersDto) {
    const { city_id, deliverable_group_id, shop_id, limit, page } = query;

    let where = {};

    if (city_id) {
      where = { ...where, shops: { city: { id: city_id } } };
    }
    if (shop_id) {
      where = { ...where, shops: { id: shop_id } };
    }
    if (deliverable_group_id) {
      where = {
        ...where,
        deliverables: {
          deliverable_group: {
            id: deliverable_group_id,
          },
        },
      };
    }

    const paginationOptions = this.paginationService.getPaginationOptions(
      limit,
      page,
    );

    const [mastersByQuery, mastersTotal] =
      await this.masterRepository.findAndCount({
        where,
        ...paginationOptions,
        order: { id: 'ASC' },
      });
    const ids = mastersByQuery.map((m) => m.id);

    const masters = await this.masterRepository
      .createQueryBuilder('master')
      .leftJoinAndSelect('master.user', 'user')
      .leftJoinAndSelect('master.shops', 'shop')
      .leftJoinAndSelect('shop.city', 'city')
      .where({ id: In(ids) })
      .orderBy('master.id', 'ASC')
      .getMany();

    let p = Promise.resolve(null);
    masters.forEach((master) => {
      p = p.then(() => {
        return this.reviewService
          .countAndSumByMaster(master.id)
          .then((reviewsScores) => {
            const { quantity, total, avg } = reviewsScores;
            master.reviews_scores_count = quantity;
            master.reviews_scores_sum = total;
            master.reviews_scores_avg = avg;
          });
      });
    });

    return p.then(() =>
      this.paginationService.getJsonObject<MasterEntity[]>(
        masters,
        mastersTotal,
        limit,
        page,
      ),
    );
  }
  async findAppointments(query?: ListAllAppointmentsDto) {
    const { master_id, date, shop_id } = query;

    let where = {};
    if (date) {
      where = {
        ...where,
        shops: {
          appointments: {
            from: Raw((alias) => `date_trunc('day', ${alias}) = :dt`, {
              dt: date,
            }),
          },
        },
      };
    }
    if (shop_id) {
      where = {
        ...where,
        shops: {
          id: shop_id,
        },
      };
    }

    if (master_id) {
      where = { ...where, id: master_id };
    }

    const masters = await this.masterRepository.find({
      where,
      relations: {
        shops: {
          appointments: true,
        },
        deliverables: true,
      },
    });

    let p = Promise.resolve(null);
    masters.forEach((master) => {
      p = p.then(() =>
        this.reviewService.findByMaster(master.id).then((reviews) => {
          master.reviews = reviews;
        }),
      );
    });
    return p.then(() => masters);
  }
}
