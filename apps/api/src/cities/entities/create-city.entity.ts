import { OmitType } from '@nestjs/swagger';
import { CityEntity } from './city.entity';

export class CreateCityEntity extends OmitType(CityEntity, [
  'name' as const,
  'center_longtitude' as const,
  'center_latitude' as const,
  'label_longtitude' as const,
  'label_latitude' as const,
  'zoom' as const,
]) {}
