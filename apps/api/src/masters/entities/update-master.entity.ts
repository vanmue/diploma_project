import { PartialType } from '@nestjs/swagger';
import { CreateMasterEntity } from './create-master.entity';

export class UpdateMasterEntity extends PartialType(CreateMasterEntity) {}
