import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { copyKeys } from 'src/utils/helpers/copy-keys';
import { In, Repository } from 'typeorm';
import { CreateDeliverableEntity } from './entities/create-deliverable.entity';
import { DeliverableEntity } from './entities/deliverable.entity';
import { UpdateDeliverableEntity } from './entities/update-deliverable.entity';
import { DeliverableGroupEntity } from './groups/entities/deliverable-group.entity';

@Injectable()
export class DeliverablesService {
  constructor(
    @InjectRepository(DeliverableEntity)
    private readonly deliverableRepository: Repository<DeliverableEntity>,
  ) {}

  async create(dto: CreateDeliverableEntity) {
    return await this.saveValues(dto, new DeliverableEntity());
  }

  async findAll() {
    return this.deliverableRepository.find({
      relations: ['deliverable_group'],
    });
  }

  async findById(id: number) {
    return this.deliverableRepository.findOneByOrFail({ id });
  }

  async findByIds(ids: number[]) {
    return this.deliverableRepository.findBy({ id: In(ids) });
  }

  async findByMaster(id: number) {
    return this.deliverableRepository.find({
      where: {
        masters: {
          id,
        },
      },
    });
  }

  async findByMasterAndDeliverable(masterId: number, deliverableId: number) {
    return this.deliverableRepository.find({
      where: {
        id: deliverableId,
        masters: {
          id: masterId,
        },
      },
    });
  }

  async remove(id: number) {
    const deliverable = await this.findById(id);
    const toRemove = { ...deliverable };
    await this.deliverableRepository.remove(deliverable);
    return toRemove;
  }

  async update(id: number, dto: UpdateDeliverableEntity) {
    const deliverable = await this.findById(id);
    return await this.saveValues(dto, deliverable);
  }

  private async saveValues(
    dto: CreateDeliverableEntity | UpdateDeliverableEntity,
    deliverable: DeliverableEntity,
  ) {
    const keys = ['name', 'price'];
    deliverable = copyKeys(keys, dto, deliverable);
    const { deliverableGroupId } = dto;
    if (deliverableGroupId) {
      const group = new DeliverableGroupEntity();
      group.id = deliverableGroupId;
      deliverable.deliverable_group = group;
    }
    return await this.deliverableRepository.save(deliverable);
  }
}
