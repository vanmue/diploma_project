import { Test, TestingModule } from '@nestjs/testing';
import { MasterReviewsController } from './master-reviews.controller';

describe('ReviewsController', () => {
  let controller: MasterReviewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MasterReviewsController],
    }).compile();

    controller = module.get<MasterReviewsController>(MasterReviewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
