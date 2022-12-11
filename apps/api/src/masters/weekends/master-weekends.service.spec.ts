import { Test, TestingModule } from '@nestjs/testing';
import { MasterWeekendsService } from './master-weekends.service';

describe('WeekendsService', () => {
  let service: MasterWeekendsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MasterWeekendsService],
    }).compile();

    service = module.get<MasterWeekendsService>(MasterWeekendsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
