import { AbstractMulterConfigService } from './abstract-multer-config.service';

export class ShopsMulterConfigService extends AbstractMulterConfigService {
  protected getSubdirectory(): string {
    return '/shops';
  }
}
