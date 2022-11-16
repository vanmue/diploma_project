import { Test, TestingModule } from '@nestjs/testing';
import { MasterReviewsService } from './master-reviews.service';

describe('ReviewsService', () => {
  let service: MasterReviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MasterReviewsService],
    }).compile();

    service = module.get<MasterReviewsService>(MasterReviewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
