import { Test, TestingModule } from '@nestjs/testing';
import { MasterWeekendsController } from './master-weekends.controller';

describe('WeekendsController', () => {
  let controller: MasterWeekendsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MasterWeekendsController],
    }).compile();

    controller = module.get<MasterWeekendsController>(MasterWeekendsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
