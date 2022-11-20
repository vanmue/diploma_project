import { ApiProperty } from '@nestjs/swagger';

export class ListAllMastersDto {
  @ApiProperty({ required: false })
  city_id?: number;

  @ApiProperty({ required: false })
  deliverable_group_id?: number;

  @ApiProperty({ required: false })
  shop_id?: number;
}
