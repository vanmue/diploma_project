import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { MasterWeekendEntity } from './master-weekend.entity';

export class CreateMasterWeekendEntity extends PickType(MasterWeekendEntity, [
  'weekday' as const,
]) {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  masterId: number;
}
