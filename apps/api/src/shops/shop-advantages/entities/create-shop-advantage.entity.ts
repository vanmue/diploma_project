import { OmitType } from '@nestjs/swagger';
import { ShopAdvantageEntity } from './shop-advantage.entity';

export class CreateShopAdvantageEntity extends OmitType(ShopAdvantageEntity, [
  'id' as const,
  'shops' as const,
]) {}
