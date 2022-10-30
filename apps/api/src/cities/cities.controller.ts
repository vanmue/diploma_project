import { Body, Controller, Post } from '@nestjs/common';
import { JsonObject } from 'src/libs/src/models/JsonObject';
import { JsonService } from 'src/services/json/json.service';
import { CitiesService } from './cities.service';
import { CityEntity } from './city.entity';

@Controller('cities')
export class CitiesController {
  constructor(
    private readonly citiesService: CitiesService,
    private readonly jsonService: JsonService,
  ) {}

  @Post()
  async create(@Body() dto: CityEntity): Promise<JsonObject<CityEntity>> {
    const data = await this.citiesService.create(dto);
    return this.jsonService.data(data);
  }
}
