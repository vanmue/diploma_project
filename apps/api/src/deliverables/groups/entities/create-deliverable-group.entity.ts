import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { DeliverableGroupEntity } from './deliverable-group.entity';

export class CreateDeliverableGroupEntity extends PickType(
  DeliverableGroupEntity,
  ['index' as const, 'name' as const],
) {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  imageId: number;
}
