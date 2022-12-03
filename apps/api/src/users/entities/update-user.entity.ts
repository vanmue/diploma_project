import { PartialType } from '@nestjs/swagger';
import { CreateUserEntity } from './create-user.entity';

export class UpdateUserEntity extends PartialType(CreateUserEntity) {}
