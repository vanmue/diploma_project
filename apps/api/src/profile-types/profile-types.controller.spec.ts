import { Test, TestingModule } from '@nestjs/testing';
import { ProfileTypesController } from './profile-types.controller';

describe('ProfileTypesController', () => {
  let controller: ProfileTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileTypesController],
    }).compile();

    controller = module.get<ProfileTypesController>(ProfileTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
