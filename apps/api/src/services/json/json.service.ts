import { Injectable, ValidationError } from '@nestjs/common';
import { JsonErrors } from 'src/libs/src/models/JsonErrors';
import { JsonObject } from 'src/libs/src/models/JsonObject';

@Injectable()
export class JsonService {
  data<T>(data: T): JsonObject<T> {
    return { data };
  }
  errors<T = unknown>(errors: JsonErrors): JsonObject<T> {
    return { errors };
  }
  toJsonErrors<T = unknown>(errors: ValidationError[]): JsonObject<T> {
    const errorsObj: JsonErrors = errors.reduce((acc, item) => {
      const message = Object.values(item.constraints).join('; ');

      acc[item.property] = message;
      return acc;
    }, {} as JsonErrors);

    return this.errors(errorsObj);
  }
}
