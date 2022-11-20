import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { MasterEntity } from '../entities/master.entity';
import { CreateMasterReviewEntity } from './entities/create-master-review.entity';
import { MasterReviewEntity } from './entities/master-review.entity';

@Injectable()
export class MasterReviewsService {
  constructor(
    @InjectRepository(MasterReviewEntity)
    private readonly reviewRepository: Repository<MasterReviewEntity>,
  ) {}
  async create(dto: CreateMasterReviewEntity) {
    const { authorId, masterId } = dto;

    const user = new UserEntity();
    user.id = authorId;

    const master = new MasterEntity();
    master.id = masterId;

    return await this.reviewRepository.save({ ...dto, user, master });
  }
}
