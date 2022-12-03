import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsModule } from 'src/appointments/appointments.module';
import { FilesModule } from 'src/files/files.module';
import { JsonService } from 'src/services/json/json.service';
import { UserAppointmentsController } from './appointments/user-appointments.controller';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    FilesModule,
    AppointmentsModule,
  ],
  providers: [UsersService, JsonService],
  controllers: [UsersController, UserAppointmentsController],
  exports: [UsersService],
})
export class UsersModule {}
