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
}
