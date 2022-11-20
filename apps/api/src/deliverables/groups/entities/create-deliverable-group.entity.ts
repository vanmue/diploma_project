import { OmitType } from '@nestjs/swagger';
import { DeliverableGroupEntity } from './deliverable-group.entity';

export class CreateDeliverableGroupEntity extends OmitType(
  DeliverableGroupEntity,
  ['id' as const],
) {}
