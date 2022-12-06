import { Test, TestingModule } from '@nestjs/testing';
import { DeliverablesByMasterController } from './deliverables-by-master.controller';

describe('DeliverablesByMasterController', () => {
  let controller: DeliverablesByMasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliverablesByMasterController],
    }).compile();

    controller = module.get<DeliverablesByMasterController>(DeliverablesByMasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
