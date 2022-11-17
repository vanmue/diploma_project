import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JsonService } from 'src/services/json/json.service';
import { DeliverableEntity } from './deliverable.entity';
import { DeliverablesController } from './deliverables.controller';
import { DeliverablesService } from './deliverables.service';

@Module({
  imports: [TypeOrmModule.forFeature([DeliverableEntity])],
  providers: [DeliverablesService, JsonService],
  controllers: [DeliverablesController],
})
export class DeliverablesModule {}
