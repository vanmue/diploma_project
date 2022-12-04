import { Test, TestingModule } from '@nestjs/testing';
import { DecimalService } from './decimal.service';

describe('DecimalService', () => {
  let service: DecimalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DecimalService],
    }).compile();

    service = module.get<DecimalService>(DecimalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
