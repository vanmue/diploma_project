import { Test, TestingModule } from '@nestjs/testing';
import { DeliverableGroupsController } from './deliverable-groups.controller';

describe('GroupsController', () => {
  let controller: DeliverableGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliverableGroupsController],
    }).compile();

    controller = module.get<DeliverableGroupsController>(
      DeliverableGroupsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
