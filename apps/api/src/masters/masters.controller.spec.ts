import { Test, TestingModule } from '@nestjs/testing';
import { MastersController } from './masters.controller';

describe('MastersController', () => {
  let controller: MastersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MastersController],
    }).compile();

    controller = module.get<MastersController>(MastersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
