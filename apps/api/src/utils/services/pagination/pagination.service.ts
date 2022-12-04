import { Injectable } from '@nestjs/common';
import { JsonObject } from 'src/libs/src/models/JsonObject';

@Injectable()
export class PaginationService {
  getPaginationOptions(limit?: string, page?: string) {
    const options: { skip?: number; take?: number } = {};

    if (limit != null) {
      options.take = Number(limit);
    }

    if (page != null) {
      options.skip = Math.max(Number(page) - 1, 0) * Number(limit ?? 0);
    } else {
      options.skip = 0;
    }

    return options;
  }
  getJsonObject<T>(
    data: T,
    totalItems?: number,
    limit?: string,
    page?: string,
  ) {
    const json: JsonObject<T> = { data };
    if (limit != null) {
      const per_page = Number(limit);
      if (per_page > 0) {
      }
      json.pagination = {
        items_total: totalItems,
        pages_total: Math.ceil(totalItems / per_page),
        per_page,
        current_page: Number(page),
      };
    }
    return json;
  }
}
