import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { ShopImageEntity } from './shop-image.entity';

export class CreateShopImageEntity extends PickType(ShopImageEntity, [
  'is_preview' as const,
]) {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  fileId: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  shopId: number;
}
