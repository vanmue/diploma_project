import { OmitType } from '@nestjs/swagger';
import { UserEntity } from './user.entity';

export class CreateUserEntity extends OmitType(UserEntity, ['id' as const]) {}
