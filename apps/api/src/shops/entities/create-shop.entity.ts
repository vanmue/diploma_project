import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { ShopEntity } from './shop.entity';

export class CreateShopEntity extends PickType(ShopEntity, [
  'name' as const,
  'address' as const,
  'working_time' as const,
  'working_start' as const,
  'working_end' as const,
  'phone' as const,
  'center_longtitude' as const,
  'center_latitude' as const,
  'label_longtitude' as const,
  'label_latitude' as const,
  'zoom' as const,
]) {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  cityId: number;

  @ApiProperty({ type: 'number', isArray: true })
  advantages: number[];

  @ApiProperty({ type: 'number', isArray: true })
  managers: number[];
}
