import { JsonErrors } from './JsonErrors';
import { JsonPagination } from './JsonPagination';

export class JsonObject<T> {
  data?: T;
  errors?: JsonErrors;
  pagination?: JsonPagination;
}
