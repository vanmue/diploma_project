import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { UserEntity } from './user.entity';

export class CreateUserEntity extends PickType(UserEntity, [
  'email' as const,
  'password' as const,
  'name' as const,
  'surname' as const,
]) {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  avatarId: number;
}
