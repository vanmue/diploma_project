import { Controller, Get } from '@nestjs/common';
import { TestResponseService } from './test-response.service';

@Controller('test-response')
export class TestResponseController {
  constructor(private readonly testResponseService: TestResponseService) {}
  @Get()
  getTestResponse() {
    return this.testResponseService.getResponse();
  }
}
