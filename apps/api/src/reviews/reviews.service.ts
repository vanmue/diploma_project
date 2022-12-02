import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentEntity } from 'src/appointments/entites/appointment.entity';
import { ProfileEntity } from 'src/profiles/entities/profile.entity';
import { Repository } from 'typeorm';
import { CreateReviewEntity } from './entities/create-review.entity';
import { ReviewEntity } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>, // private readonly profilesService: ProfilesService, // private readonly appointmentsService: AppointmentsService,
  ) {}
  async create(dto: CreateReviewEntity) {
    const { profileId, appointmentId } = dto;

    const review = new ReviewEntity();

    const profile = new ProfileEntity();
    profile.id = profileId;
    review.profile = profile;

    const appointment = new AppointmentEntity();
    appointment.id = appointmentId;
    review.appointment = appointment;

    const keys = ['score', 'review'];
    keys.forEach((key) => {
      if (dto[key]) {
        review[key] = dto[key];
      }
    });

    return await this.reviewRepository.save(review);
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
}
