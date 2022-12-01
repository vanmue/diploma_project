import { PartialType } from '@nestjs/swagger';
import { CreateShopImageEntity } from './create-shop-image.entity';

export class UpdateShopImageEntity extends PartialType(CreateShopImageEntity) {}
