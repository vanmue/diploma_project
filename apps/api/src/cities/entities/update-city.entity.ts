import { PartialType } from '@nestjs/swagger';
import { CreateCityEntity } from './create-city.entity';

export class UpdateCityEntity extends PartialType(CreateCityEntity) {}
