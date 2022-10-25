import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupEntity } from './group.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,
  ) {}
  async create(dto: GroupEntity) {
    return await this.groupRepository.save(dto);
  }
  async findAll() {
    return await this.groupRepository.find({ order: { index: 'ASC' } });
  }
}
