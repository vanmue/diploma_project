import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JsonService } from 'src/json/json.service';
import { GroupEntity } from './group.entity';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';

@Module({
  controllers: [GroupsController],
  providers: [GroupsService, JsonService],
  imports: [TypeOrmModule.forFeature([GroupEntity])],
})
export class GroupsModule {}
