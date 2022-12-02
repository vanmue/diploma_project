import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JsonService } from 'src/services/json/json.service';
import { UsersModule } from 'src/users/users.module';
import { ProfileEntity } from './entities/profile.entity';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';

@Module({
  providers: [ProfilesService, JsonService],
  imports: [TypeOrmModule.forFeature([ProfileEntity]), UsersModule],
  exports: [ProfilesService],
  controllers: [ProfilesController],
})
export class ProfilesModule {}
