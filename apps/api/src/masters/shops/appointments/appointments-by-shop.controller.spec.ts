import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentsByShopController } from './appointments-by-shop.controller';

describe('ShopsController', () => {
  let controller: AppointmentsByShopController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentsByShopController],
    }).compile();

    controller = module.get<AppointmentsByShopController>(
      AppointmentsByShopController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
