import { PartialType } from '@nestjs/swagger';
import { CreateShopEntity } from './create-shop.entity';

export class UpdateShopEntity extends PartialType(CreateShopEntity) {}
