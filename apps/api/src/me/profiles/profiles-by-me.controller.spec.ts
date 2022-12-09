import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesByMeController } from './profiles-by-me.controller';

describe('ProfilesController', () => {
  let controller: ProfilesByMeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfilesByMeController],
    }).compile();

    controller = module.get<ProfilesByMeController>(ProfilesByMeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
