import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListAllAppointmentsDto } from 'src/appointments/list-all-appointments.dto';
import { DeliverableGroupsService } from 'src/deliverables/groups/deliverable-groups.service';
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
  ) {}
  async create(dto: CreateMasterEntity) {
    const { userId, shops } = dto;

    const user = new UserEntity();
    user.id = userId;

    const shopEntities = shops.map((id) => {
      const shop = new ShopEntity();
      shop.id = id;
      return shop;
    });

    return await this.masterRepository.save({
      ...dto,
      user,
      shops: shopEntities,
    });
  }
  async findDeliverableGroups(query?: ListAllMastersDto) {
    const { city_id, deliverable_group_id, shop_id } = query;

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

    const mastersByQuery = await this.masterRepository.find({ where });
    const ids = mastersByQuery.map((m) => m.id);

    const masters = await this.masterRepository
      .createQueryBuilder('master')
      .loadRelationCountAndMap(
        'master.reviews_count',
        'master.reviews',
        'review',
      )
      .leftJoinAndSelect('master.user', 'user')
      .leftJoinAndSelect('master.shops', 'shop')
      .leftJoinAndSelect('shop.city', 'city')
      .where({ id: In(ids) })
      .getMany();

    let p = Promise.resolve(null);
    masters.forEach((master) => {
      p = p
        .then(() => this.deliverableGroupsService.findByMaster(master.id))
        .then((groups) => (master.deliverable_groups = groups));
    });

    return p.then(() => masters);
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

    return this.masterRepository.find({
      where,
      relations: ['shops.appointments', 'deliverables'],
    });
  }
}
