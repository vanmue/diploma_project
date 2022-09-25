import { Injectable } from '@nestjs/common';
import { IJsonObject } from 'src/interfaces/IJsonObject';

@Injectable()
export class TestResponseService {
  getResponse(): IJsonObject<Record<string, string>> {
    return {
      data: { 'test response': 'hello world' },
    };
  }
}
