import { Injectable } from '@nestjs/common';
import { TransformFnParams } from 'class-transformer';
import Decimal from 'decimal.js';
import { ValueTransformer } from 'typeorm';

@Injectable()
export class DecimalService implements ValueTransformer {
  // интерфейс ValueTransformer
  to(decimal?: Decimal): string {
    return decimal?.toString(); // запись в БД
  }
  from(decimal?: string): Decimal | null {
    return decimal ? new Decimal(decimal) : null; // чтение из БД
  }
  // дополнительные функции
  toNumber({ value }: TransformFnParams) {
    return (value as Decimal)?.toNumber?.() || value;
  }
}

export default new DecimalService();
