import { ApiProperty } from '@nestjs/swagger';

export class ListAllMastersDto {
  @ApiProperty({ required: false })
  city_id?: string;

  @ApiProperty({ required: false })
  deliverable_group_id?: string;

  @ApiProperty({ required: false })
  shop_id?: string;

  @ApiProperty({ required: false })
  limit?: string;

  @ApiProperty({ required: false })
  page?: string;
}
