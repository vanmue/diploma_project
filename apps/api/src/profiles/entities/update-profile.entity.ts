import { PartialType } from '@nestjs/swagger';
import { CreateProfileEntity } from './create-profile.entity';

export class UpdateProfileEntity extends PartialType(CreateProfileEntity) {}
