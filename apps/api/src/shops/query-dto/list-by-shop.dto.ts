import { ApiProperty } from '@nestjs/swagger';

export class ListByShopDto {
  @ApiProperty({ required: false })
  limit?: string;

  @ApiProperty({ required: false })
  page?: string;
}
