import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { JsonObject } from 'src/libs/src/models/JsonObject';
import { JsonService } from 'src/services/json/json.service';
import { CitiesService } from './cities.service';
import { CityEntity } from './entities/city.entity';
import { CreateCityEntity } from './entities/create-city.entity';
import { UpdateCityEntity } from './entities/update-city.entity';

@Controller('cities')
@UseInterceptors(ClassSerializerInterceptor)
export class CitiesController {
  constructor(
    private readonly citiesService: CitiesService,
    private readonly jsonService: JsonService,
  ) {}

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const data = await this.citiesService.remove(id);
    return this.jsonService.data(data);
  }

  @Get()
  async getAll() {
    const data = await this.citiesService.findAll();
    return this.jsonService.data(data);
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    const data = await this.citiesService.findById(id);
    return this.jsonService.data(data);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateCityEntity) {
    const data = await this.citiesService.update(id, dto);
    return this.jsonService.data(data);
  }

  @Post()
  async create(@Body() dto: CreateCityEntity): Promise<JsonObject<CityEntity>> {
    const data = await this.citiesService.create(dto);
    return this.jsonService.data(data);
  }
}
