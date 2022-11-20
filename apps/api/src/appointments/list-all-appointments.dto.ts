import { ApiProperty } from '@nestjs/swagger';

export class ListAllAppointmentsDto {
  @ApiProperty({ required: false })
  master_id?: number;

  @ApiProperty({ required: false })
  date?: Date;

  @ApiProperty({ required: false })
  shop_id?: number;
}
