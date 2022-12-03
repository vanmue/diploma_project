import { PartialType } from '@nestjs/swagger';
import { CreateShopAdvantageEntity } from './create-shop-advantage.entity';

export class UpdateShopAdvantageEntity extends PartialType(
  CreateShopAdvantageEntity,
) {}
