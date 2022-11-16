import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ListAllMastersDto } from './list-all-masters-dto';
import { MasterEntity } from './master.entity';

@Injectable()
export class MastersService {
  constructor(
    @InjectRepository(MasterEntity)
    private readonly masterRepository: Repository<MasterEntity>,
  ) {}
  async create(dto: MasterEntity) {
    return await this.masterRepository.save(dto);
  }
  async findAll(query?: ListAllMastersDto) {
    const { city_id, deliverable_group_id, shop_id } = query;

    let where = {};

    if (city_id) {
      where = { ...where, shops: { city: { id: city_id } } };
    }
    if (shop_id) {
      where = { ...where, shops: { id: shop_id } };
    }
    if (deliverable_group_id) {
      where = { ...where, deliverable_groups: { id: deliverable_group_id } };
    }

    const mastersByQuery = await this.masterRepository.find({ where });
    const ids = mastersByQuery.map((m) => m.id);

    return await this.masterRepository
      .createQueryBuilder('master')
      .loadRelationCountAndMap(
        'master.reviews_count',
        'master.reviews',
        'review',
      )
      .leftJoinAndSelect('master.user', 'user')
      .leftJoinAndSelect('master.shops', 'shop')
      .leftJoinAndSelect('shop.city', 'city')
      .leftJoinAndSelect('master.deliverable_groups', 'deliverable_group')
      .where({ id: In(ids) })
      .getMany();
  }
}
