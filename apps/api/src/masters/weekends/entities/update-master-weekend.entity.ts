import { PartialType } from '@nestjs/swagger';
import { CreateMasterWeekendEntity } from './create-master-weekend.entity';

export class UpdateMasterWeekendEntity extends PartialType(
  CreateMasterWeekendEntity,
) {}
