import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { DeliverableEntity } from './deliverable.entity';

export class CreateDeliverableEntity extends OmitType(DeliverableEntity, [
  'id' as const,
  'masters' as const,
  'deliverable_group' as const,
]) {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  deliverableGroupId: number;
}
