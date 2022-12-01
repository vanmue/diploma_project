import { Test, TestingModule } from '@nestjs/testing';
import { ImagesByShopController } from './images-by-shop.controller';

describe('ShopImagesController', () => {
  let controller: ImagesByShopController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImagesByShopController],
    }).compile();

    controller = module.get<ImagesByShopController>(ImagesByShopController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
