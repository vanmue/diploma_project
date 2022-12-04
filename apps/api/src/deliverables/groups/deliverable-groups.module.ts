import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from 'src/files/files.module';
import { JsonService } from 'src/utils/services/json/json.service';
import { DeliverableGroupsController } from './deliverable-groups.controller';
import { DeliverableGroupsService } from './deliverable-groups.service';
import { DeliverableGroupEntity } from './entities/deliverable-group.entity';

@Module({
  controllers: [DeliverableGroupsController],
  providers: [DeliverableGroupsService, JsonService],
  imports: [TypeOrmModule.forFeature([DeliverableGroupEntity]), FilesModule],
  exports: [DeliverableGroupsService],
})
export class DeliverableGroupsModule {}
