import { ApiProperty } from '@nestjs/swagger';

export class ListAllDto {
  @ApiProperty({ required: false })
  city_id?: number;

  @ApiProperty({ required: false })
  deliverable_group_id?: number;

  @ApiProperty({ required: false })
  limit?: string;

  @ApiProperty({ required: false })
  page?: string;
}
