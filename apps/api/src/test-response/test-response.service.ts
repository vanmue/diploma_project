import { Injectable } from '@nestjs/common';
import { JsonObject } from '../libs/src/models/JsonObject';

@Injectable()
export class TestResponseService {
  getResponse(): JsonObject<Record<string, string>> {
    return {
      data: { 'test response': 'hello world' },
    };
  }
}
