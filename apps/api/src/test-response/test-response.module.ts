import { Module } from '@nestjs/common';
import { TestResponseController } from './test-response.controller';
import { TestResponseService } from './test-response.service';

@Module({
  controllers: [TestResponseController],
  providers: [TestResponseService]
})
export class TestResponseModule {}
