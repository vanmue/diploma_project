import { PickType } from '@nestjs/swagger';
import { ShopAdvantageEntity } from './shop-advantage.entity';

export class CreateShopAdvantageEntity extends PickType(ShopAdvantageEntity, [
  'name' as const,
]) {}
