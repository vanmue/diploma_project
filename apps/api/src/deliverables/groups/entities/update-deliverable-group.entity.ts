import { PartialType } from '@nestjs/swagger';
import { CreateDeliverableGroupEntity } from './create-deliverable-group.entity';

export class UpdateDeliverableGroupEntity extends PartialType(
  CreateDeliverableGroupEntity,
) {}
