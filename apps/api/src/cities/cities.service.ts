import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { copyKeys } from 'src/utils/copy-keys';
import { Repository } from 'typeorm';
import { CityEntity } from './entities/city.entity';
import { CreateCityEntity } from './entities/create-city.entity';
import { UpdateCityEntity } from './entities/update-city.entity';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
  ) {}
  async create(dto: CreateCityEntity) {
    return await this.saveValues(dto, new CityEntity());
  }
  async findAll() {
    return await this.cityRepository.find({ order: { name: 'ASC' } });
  }
  async findById(id: number) {
    return await this.cityRepository.findOneByOrFail({ id });
  }
  async remove(id: number) {
    const city = await this.findById(id);
    const toRemove = { ...city };
    await this.cityRepository.remove(city);
    return toRemove;
  }
  async update(id: number, dto: UpdateCityEntity) {
    const city = await this.findById(id);
    return await this.saveValues(dto, city);
  }
  private async saveValues(
    dto: CreateCityEntity | UpdateCityEntity,
    city: CityEntity,
  ) {
    const keys = [
      'name',
      'center_longtitude',
      'center_latitude',
      'label_longtitude',
      'label_latitude',
      'zoom',
    ];
    city = copyKeys(keys, dto, city);
    return await this.cityRepository.save(city);
  }
}
