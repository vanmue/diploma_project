import { Module } from '@nestjs/common';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { CustomersService } from './customers.service';

@Module({
  providers: [CustomersService],
  exports: [CustomersService],
  imports: [ProfilesModule],
})
export class CustomersModule {}
