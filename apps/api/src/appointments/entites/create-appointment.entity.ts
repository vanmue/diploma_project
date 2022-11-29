import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { AppointmentEntity } from './appointment.entity';

export class CreateAppointmentEntity extends OmitType(AppointmentEntity, [
  'id' as const,
]) {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  shopId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  masterId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  deliverableId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  userId: number;
}
