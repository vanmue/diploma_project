import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentEntity } from 'src/appointments/entites/appointment.entity';
import { ProfilesService } from 'src/profiles/profiles.service';
import { Repository } from 'typeorm';
import { CreateReviewEntity } from './entities/create-review.entity';
import { ReviewEntity } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>, // private readonly profilesService: ProfilesService, // private readonly appointmentsService: AppointmentsService,
    private readonly profilesService: ProfilesService,
  ) {}
  async create(dto: CreateReviewEntity) {
    return await this.saveValues(dto, new ReviewEntity());
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

  async findByMaster(masterId: number) {
    return await this.reviewRepository
      .createQueryBuilder('review')
      .leftJoin('review.appointment', 'appointment')
      .leftJoin('appointment.master', 'master')
      .leftJoinAndSelect('review.profile', 'profile')
      .leftJoinAndSelect('profile.user', 'user')
      .where('master.id = :masterId', { masterId })
      .andWhere('review.score IS NOT NULL OR review.review IS NOT NULL')
      .getMany();
  }
  private async saveValues(dto: CreateReviewEntity, review: ReviewEntity) {
    const keys = ['score', 'review'];
    keys.forEach((key) => {
      if (dto[key]) {
        review[key] = dto[key];
      }
    });
    const { userId, appointmentId } = dto;
    if (userId) {
      review.profile = await this.profilesService.findCustomer(userId);
    }
    if (appointmentId) {
      review.appointment = new AppointmentEntity();
      review.appointment.id = appointmentId;
    }
    return await this.reviewRepository.save(review);
  }
}
