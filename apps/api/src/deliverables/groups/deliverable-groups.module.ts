import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JsonService } from 'src/services/json/json.service';
import { DeliverableGroupEntity } from './deliverable-group.entity';
import { DeliverableGroupsController } from './deliverable-groups.controller';
import { DeliverableGroupsService } from './deliverable-groups.service';

@Module({
  controllers: [DeliverableGroupsController],
  providers: [DeliverableGroupsService, JsonService],
  imports: [TypeOrmModule.forFeature([DeliverableGroupEntity])],
})
export class DeliverableGroupsModule {}
