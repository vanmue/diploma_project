import { Test, TestingModule } from '@nestjs/testing';
import { TestResponseService } from './test-response.service';

describe('TestResponseService', () => {
  let service: TestResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestResponseService],
    }).compile();

    service = module.get<TestResponseService>(TestResponseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
