import { Test, TestingModule } from '@nestjs/testing';
import { ShopAdvantagesController } from './shop-advantages.controller';

describe('ShopAdvantagesController', () => {
  let controller: ShopAdvantagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShopAdvantagesController],
    }).compile();

    controller = module.get<ShopAdvantagesController>(ShopAdvantagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
