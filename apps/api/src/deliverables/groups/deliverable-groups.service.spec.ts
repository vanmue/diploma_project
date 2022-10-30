import { Test, TestingModule } from '@nestjs/testing';
import { DeliverableGroupsService } from './deliverable-groups.service';

describe('GroupsService', () => {
  let service: DeliverableGroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliverableGroupsService],
    }).compile();

    service = module.get<DeliverableGroupsService>(DeliverableGroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
