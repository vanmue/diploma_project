import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateDeliverableEntity } from './entities/create-deliverable.entity';
import { DeliverableEntity } from './entities/deliverable.entity';
import { DeliverableGroupEntity } from './groups/entities/deliverable-group.entity';

@Injectable()
export class DeliverablesService {
  constructor(
    @InjectRepository(DeliverableEntity)
    private readonly deliverableRepository: Repository<DeliverableEntity>,
  ) {}

  async create(dto: CreateDeliverableEntity) {
    const { deliverableGroupId } = dto;

    const deliverable_group = new DeliverableGroupEntity();
    deliverable_group.id = deliverableGroupId;

    return await this.deliverableRepository.save({ ...dto, deliverable_group });
  }

  async findAll() {
    return this.deliverableRepository.find({
      relations: ['deliverable_group'],
    });
  }

  async findByIds(ids: number[]) {
    return this.deliverableRepository.findBy({ id: In(ids) });
  }
}
