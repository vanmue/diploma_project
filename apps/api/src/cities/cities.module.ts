import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JsonService } from 'src/services/json/json.service';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { CityEntity } from './entities/city.entity';

@Module({
  controllers: [CitiesController],
  providers: [CitiesService, JsonService],
  imports: [TypeOrmModule.forFeature([CityEntity])],
})
export class CitiesModule {}
