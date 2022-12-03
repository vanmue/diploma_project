import { PartialType } from '@nestjs/swagger';
import { CreateDeliverableEntity } from './create-deliverable.entity';

export class UpdateDeliverableEntity extends PartialType(
  CreateDeliverableEntity,
) {}
