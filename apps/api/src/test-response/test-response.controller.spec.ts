import { Test, TestingModule } from '@nestjs/testing';
import { TestResponseController } from './test-response.controller';

describe('TestResponseController', () => {
  let controller: TestResponseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestResponseController],
    }).compile();

    controller = module.get<TestResponseController>(TestResponseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
