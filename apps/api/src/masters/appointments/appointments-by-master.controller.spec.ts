import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentsByMasterController } from './appointments-by-master.controller';

describe('AppointmentsByMasterController', () => {
  let controller: AppointmentsByMasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentsByMasterController],
    }).compile();

    controller = module.get<AppointmentsByMasterController>(AppointmentsByMasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
