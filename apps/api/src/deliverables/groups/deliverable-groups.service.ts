import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliverableGroupEntity } from './deliverable-group.entity';

@Injectable()
export class DeliverableGroupsService {
  constructor(
    @InjectRepository(DeliverableGroupEntity)
    private readonly deliverableGroupRepository: Repository<DeliverableGroupEntity>,
  ) {}
  async create(dto: DeliverableGroupEntity) {
    return await this.deliverableGroupRepository.save(dto);
  }
  async findAll() {
    return await this.deliverableGroupRepository.find({
      order: { index: 'ASC' },
    });
  }
  async findByShop(shopId: number) {
    const deliverables = await this.deliverableGroupRepository.find({
      where: {
        deliverables: {
          masters: {
            shops: {
              id: shopId,
            },
          },
        },
      },
    });
    const reduced = deliverables.reduce((acc, item) => {
      acc.set(item.id, item);
      return acc;
    }, new Map<number, DeliverableGroupEntity>());
    return [...reduced.values()];
  }
  async findByMaster(masterId: number) {
    const deliverables = await this.deliverableGroupRepository.find({
      where: {
        deliverables: {
          masters: {
            id: masterId,
          },
        },
      },
    });
    const reduced = deliverables.reduce((acc, item) => {
      acc.set(item.id, item);
      return acc;
    }, new Map<number, DeliverableGroupEntity>());
    return [...reduced.values()];
  }
}
