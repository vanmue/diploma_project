import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityEntity } from './city.entity';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
  ) {}
  async create(dto: CityEntity) {
    return await this.cityRepository.save(dto);
  }
  async findAll() {
    return await this.cityRepository.find({ order: { name: 'ASC' } });
  }
}
