import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { ProfileEntity } from './profile.entity';

export class CreateProfileEntity extends PickType(ProfileEntity, [
  'profile_type' as const,
]) {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  userId: number;
}
