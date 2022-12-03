import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { AppointmentEntity } from './appointment.entity';

export class CreateAppointmentEntity extends PickType(AppointmentEntity, [
  'comments' as const,
  'from' as const,
  'to' as const,
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
  customerId: number;
}
