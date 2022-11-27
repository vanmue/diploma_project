import { AbstractMulterConfigService } from './abstract-multer-config.service';

export class MastersMulterConfigService extends AbstractMulterConfigService {
  protected getSubdirectory(): string {
    return '/masters';
  }
}
