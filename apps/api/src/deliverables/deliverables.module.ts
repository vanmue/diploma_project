import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JsonService } from 'src/services/json/json.service';
import { DeliverablesController } from './deliverables.controller';
import { DeliverablesService } from './deliverables.service';
import { DeliverableEntity } from './entities/deliverable.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeliverableEntity])],
  providers: [DeliverablesService, JsonService],
  controllers: [DeliverablesController],
  exports: [DeliverablesService],
})
export class DeliverablesModule {}
