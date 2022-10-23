import type { JsonError } from "./JsonError";

export class JsonObject<T> {
  data?: T;
  errors?: JsonError[];
}
