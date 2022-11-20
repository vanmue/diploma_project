import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { ShopEntity } from './shop.entity';

export class CreateShopEntity extends OmitType(ShopEntity, [
  'id' as const,
  'city' as const,
  'advantages' as const,
  'masters' as const,
  'appointments' as const,
  'deliverable_groups' as const,
]) {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  cityId: number;

  @ApiProperty({ type: 'number', isArray: true })
  advantages: number[];
}
