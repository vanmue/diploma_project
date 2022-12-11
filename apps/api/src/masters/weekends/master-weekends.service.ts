import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { copyKeys } from 'src/utils/helpers/copy-keys';
import { Repository } from 'typeorm';
import { MasterEntity } from '../entities/master.entity';
import { CreateMasterWeekendEntity } from './entities/create-master-weekend.entity';
import { MasterWeekendEntity } from './entities/master-weekend.entity';
import { UpdateMasterWeekendEntity } from './entities/update-master-weekend.entity';

@Injectable()
export class MasterWeekendsService {
  constructor(
    @InjectRepository(MasterWeekendEntity)
    private readonly masterWeekendRepository: Repository<MasterWeekendEntity>,
  ) {}
  findAll() {
    return this.masterWeekendRepository.find();
  }
  findById(id: number) {
    return this.masterWeekendRepository.findOneByOrFail({ id });
  }
  create(dto: CreateMasterWeekendEntity) {
    return this.saveValues(dto, new MasterWeekendEntity());
  }
  async remove(id: number) {
    const weekend = await this.findById(id);
    const toRemove = { ...weekend };
    await this.masterWeekendRepository.remove(weekend);
    return toRemove;
  }
  async update(id: number, dto: UpdateMasterWeekendEntity) {
    const weekend = await this.masterWeekendRepository.findOneByOrFail({ id });
    return this.saveValues(dto, weekend);
  }
  private saveValues(
    dto: CreateMasterWeekendEntity | UpdateMasterWeekendEntity,
    weekend: MasterWeekendEntity,
  ) {
    const keys = ['weekday'];
    weekend = copyKeys(keys, dto, weekend);
    const { masterId } = dto;
    if (masterId) {
      const master = new MasterEntity();
      master.id = masterId;
      weekend.master = master;
    }
    console.log('weekend', weekend);
    return this.masterWeekendRepository.save(weekend);
  }
}
