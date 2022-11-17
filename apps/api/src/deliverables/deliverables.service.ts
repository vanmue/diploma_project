import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliverableEntity } from './deliverable.entity';

@Injectable()
export class DeliverablesService {
  constructor(
    @InjectRepository(DeliverableEntity)
    private readonly deliverableRepository: Repository<DeliverableEntity>,
  ) {}

  async create(dto: DeliverableEntity) {
    return await this.deliverableRepository.save(dto);
  }

  async findAll() {
    return this.deliverableRepository.find();
  }
}
