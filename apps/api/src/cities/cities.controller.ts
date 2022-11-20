import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { JsonObject } from 'src/libs/src/models/JsonObject';
import { JsonService } from 'src/services/json/json.service';
import { CitiesService } from './cities.service';
import { CityEntity } from './entities/city.entity';
import { CreateCityEntity } from './entities/create-city.entity';

@Controller('cities')
@UseInterceptors(ClassSerializerInterceptor)
export class CitiesController {
  constructor(
    private readonly citiesService: CitiesService,
    private readonly jsonService: JsonService,
  ) {}

  @Get()
  async getAll() {
    const data = await this.citiesService.findAll();
    return this.jsonService.data(data);
  }

  @Post()
  async create(@Body() dto: CreateCityEntity): Promise<JsonObject<CityEntity>> {
    const data = await this.citiesService.create(dto);
    return this.jsonService.data(data);
  }
}
