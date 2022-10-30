import { Test, TestingModule } from '@nestjs/testing';
import { ShopAdvantagesService } from './shop-advantages.service';

describe('ShopAdvantagesService', () => {
  let service: ShopAdvantagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShopAdvantagesService],
    }).compile();

    service = module.get<ShopAdvantagesService>(ShopAdvantagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
