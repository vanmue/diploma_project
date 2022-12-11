import { Test, TestingModule } from '@nestjs/testing';
import { ShopPoliciesService } from './shop-policies.service';

describe('PoliciesService', () => {
  let service: ShopPoliciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShopPoliciesService],
    }).compile();

    service = module.get<ShopPoliciesService>(ShopPoliciesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
