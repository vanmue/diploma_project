import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JsonService } from 'src/utils/services/json/json.service';
import { MasterWeekendEntity } from './entities/master-weekend.entity';
import { MasterWeekendsController } from './master-weekends.controller';
import { MasterWeekendsService } from './master-weekends.service';

@Module({
  providers: [MasterWeekendsService, JsonService],
  controllers: [MasterWeekendsController],
  imports: [TypeOrmModule.forFeature([MasterWeekendEntity])],
})
export class MasterWeekendsModule {}
