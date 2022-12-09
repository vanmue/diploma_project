import { Test, TestingModule } from '@nestjs/testing';
import { ShopManagersService } from './shop-managers.service';

describe('ShopManagersService', () => {
  let service: ShopManagersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShopManagersService],
    }).compile();

    service = module.get<ShopManagersService>(ShopManagersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
