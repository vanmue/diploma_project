import { AbstractMulterConfigService } from './abstract-multer-config.service';

export class FilesMulterConfigService extends AbstractMulterConfigService {
  protected getSubdirectory(): string {
    return '/files';
  }
}
