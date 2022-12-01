import { Test, TestingModule } from '@nestjs/testing';
import { ShopImagesService } from './shop-images.service';

describe('ShopImagesService', () => {
  let service: ShopImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShopImagesService],
    }).compile();

    service = module.get<ShopImagesService>(ShopImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
