import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { CustomersService } from './customers.service';

@Module({
  providers: [CustomersService],
  imports: [UsersModule],
  exports: [CustomersService],
})
export class CustomersModule {}
