import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentEntity } from 'src/appointments/entites/appointment.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateReviewEntity } from './entities/create-review.entity';
import { ReviewEntity } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
  ) {}
  async create(dto: CreateReviewEntity) {
    const { authorId, appointmentId } = dto;

    const user = new UserEntity();
    user.id = authorId;

    const appointment = new AppointmentEntity();
    appointment.id = appointmentId;

    return await this.reviewRepository.save({ ...dto, user, appointment });
  }

  async findAll() {
    return await this.reviewRepository.find();
  }

  async countAndSumByMaster(masterId: number) {
    return await this.reviewRepository
      .createQueryBuilder('review')
      .select('CAST(COUNT(review.id) AS REAL)', 'quantity')
      .addSelect('CAST(SUM(review.score) AS REAL)', 'total')
      .addSelect('CAST(SUM(review.score) AS REAL) / COUNT(review.id)', 'avg')
      .leftJoin('review.appointment', 'appointment')
      .leftJoin('appointment.master', 'master')
      .where('master.id = :masterId', { masterId })
      .andWhere('review.score IS NOT NULL')
      .getRawOne();
  }
}
