import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from 'src/files/files.module';
import { JsonService } from 'src/services/json/json.service';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), FilesModule],
  providers: [UsersService, JsonService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
