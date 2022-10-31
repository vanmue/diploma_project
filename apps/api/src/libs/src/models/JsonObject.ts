import { JsonErrors } from './JsonErrors';

export class JsonObject<T> {
  data?: T;
  errors?: JsonErrors;
}
