import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { DeliverableEntity } from './deliverable.entity';

export class CreateDeliverableEntity extends PickType(DeliverableEntity, [
  'name' as const,
  'price' as const,
]) {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  deliverableGroupId: number;
}
