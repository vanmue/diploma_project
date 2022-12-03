import { PartialType } from '@nestjs/swagger';
import { CreateAppointmentEntity } from './create-appointment.entity';

export class UpdateAppointmentEntity extends PartialType(
  CreateAppointmentEntity,
) {}
