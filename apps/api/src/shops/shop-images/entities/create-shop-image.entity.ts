import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { ShopImageEntity } from './shop-image.entity';

export class CreateShopImageEntity extends OmitType(ShopImageEntity, [
  'id' as const,
  'shop' as const,
]) {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  shopId: number;
}
