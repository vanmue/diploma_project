import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentEntity } from 'src/appointments/entites/appointment.entity';
import { ProfilesService } from 'src/profiles/profiles.service';
import { copyKeys } from 'src/utils/helpers/copy-keys';
import { Repository } from 'typeorm';
import { CreateReviewEntity } from './entities/create-review.entity';
import { ReviewEntity } from './entities/review.entity';
import { UpdateReviewEntity } from './entities/update-review.entity';

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

  async findById(id: number) {
    return await this.reviewRepository.findOneByOrFail({ id });
  }

  async findByMaster(masterId: number) {
    const query = this.reviewRepository
      .createQueryBuilder('review')
      .innerJoin('review.appointment', 'appointment')
      .innerJoin('appointment.master', 'master')
      .leftJoinAndSelect('review.profile', 'profile')
      .leftJoinAndSelect('profile.user', 'user')
      .leftJoinAndSelect('user.avatar', 'avatar')
      .where('master.id = :masterId', { masterId })
      .andWhere('(review.score IS NOT NULL OR review.review IS NOT NULL)');

    return await query.getMany();
  }

  async remove(id: number) {
    const review = await this.findById(id);
    const toRemove = { ...review };
    await this.reviewRepository.remove(review);
    return toRemove;
  }

  async update(id: number, dto: UpdateReviewEntity) {
    const review = await this.findById(id);
    return await this.saveValues(dto, review);
  }

  private async saveValues(
    dto: CreateReviewEntity | UpdateReviewEntity,
    review: ReviewEntity,
  ) {
    const keys = ['score', 'review'];
    review = copyKeys(keys, dto, review);
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
