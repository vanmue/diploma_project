import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MasterReviewEntity } from './master-review.entity';

@Injectable()
export class MasterReviewsService {
  constructor(
    @InjectRepository(MasterReviewEntity)
    private readonly reviewRepository: Repository<MasterReviewEntity>,
  ) {}
  async create(dto: MasterReviewEntity) {
    return await this.reviewRepository.save(dto);
  }
}
