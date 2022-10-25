import { Injectable } from '@nestjs/common';
import { JsonObject } from 'src/libs/src/models/JsonObject';

@Injectable()
export class JsonService {
  data<T>(data: T): JsonObject<T> {
    return { data };
  }
}
