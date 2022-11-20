import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityEntity } from './entities/city.entity';
import { CreateCityEntity } from './entities/create-city.entity';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
  ) {}
  async create(dto: CreateCityEntity) {
    return await this.cityRepository.save(dto);
  }
  async findAll() {
    return await this.cityRepository.find({ order: { name: 'ASC' } });
  }
}
