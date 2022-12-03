import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from 'src/files/entities/file.entity';
import { FilesService } from 'src/files/files.service';
import { copyKeys } from 'src/utils/copy-keys';
import { Repository } from 'typeorm';
import { CreateDeliverableGroupEntity } from './entities/create-deliverable-group.entity';
import { DeliverableGroupEntity } from './entities/deliverable-group.entity';
import { UpdateDeliverableGroupEntity } from './entities/update-deliverable-group.entity';

@Injectable()
export class DeliverableGroupsService {
  constructor(
    @InjectRepository(DeliverableGroupEntity)
    private readonly deliverableGroupRepository: Repository<DeliverableGroupEntity>,
    private readonly filesService: FilesService,
  ) {}
  async create(dto: CreateDeliverableGroupEntity) {
    return await this.saveValues(dto, new DeliverableGroupEntity());
  }
  async findAll() {
    return await this.deliverableGroupRepository.find({
      order: { index: 'ASC' },
      relations: ['deliverables'],
    });
  }
  async findById(id: number) {
    return await this.deliverableGroupRepository.findOneByOrFail({ id });
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
  async update(id: number, dto: UpdateDeliverableGroupEntity) {
    const group = await this.findById(id);
    return await this.saveValues(dto, group);
  }
  async remove(id: number) {
    const group = await this.deliverableGroupRepository.findOneOrFail({
      where: { id },
      relations: ['image'],
    });
    const fileId = group.image.id;
    const toRemove = { ...group };
    await this.deliverableGroupRepository.remove(group);
    await this.filesService.remove(fileId);
    return toRemove;
  }
  private async saveValues(
    dto: CreateDeliverableGroupEntity | UpdateDeliverableGroupEntity,
    group: DeliverableGroupEntity,
  ) {
    const keys = ['index', 'name'];
    group = copyKeys(keys, dto, group);
    const { imageId } = dto;
    if (imageId) {
      const file = new FileEntity();
      file.id = imageId;
      group.image = file;
    }

    return await this.deliverableGroupRepository.save(group);
  }
}
