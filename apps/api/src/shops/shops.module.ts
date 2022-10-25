import { Module } from '@nestjs/common';
import { ShopsController } from './shops.controller';

@Module({
  controllers: [ShopsController],
})
export class ShopsModule {}
