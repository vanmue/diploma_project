import { OmitType } from '@nestjs/swagger';
import { CityEntity } from './city.entity';

export class CreateCityEntity extends OmitType(CityEntity, [
  'id' as const,
  'shops' as const,
]) {}
