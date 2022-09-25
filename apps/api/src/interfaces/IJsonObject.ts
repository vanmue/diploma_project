import { IJsonObjectError } from './IJsonObjectError';

export interface IJsonObject<T> {
  data?: T;
  errors?: IJsonObjectError[];
}
