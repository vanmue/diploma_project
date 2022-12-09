import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { JsonService } from 'src/utils/services/json/json.service';
import { ProfileTypesController } from './profile-types.controller';
import { ProfileTypesService } from './profile-types.service';

@Module({
  controllers: [ProfileTypesController],
  imports: [UsersModule],
  providers: [ProfileTypesService, JsonService],
  exports: [ProfileTypesService],
})
export class ProfileTypesModule {}
