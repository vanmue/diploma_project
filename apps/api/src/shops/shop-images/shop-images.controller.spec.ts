import { Test, TestingModule } from '@nestjs/testing';
import { ShopImagesController } from './shop-images.controller';

describe('ShopImagesController', () => {
  let controller: ShopImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShopImagesController],
    }).compile();

    controller = module.get<ShopImagesController>(ShopImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
