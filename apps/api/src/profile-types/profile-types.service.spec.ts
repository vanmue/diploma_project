import { Test, TestingModule } from '@nestjs/testing';
import { ProfileTypesService } from './profile-types.service';

describe('ProfileTypesService', () => {
  let service: ProfileTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileTypesService],
    }).compile();

    service = module.get<ProfileTypesService>(ProfileTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
