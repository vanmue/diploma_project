import { AbstractMulterConfigService } from './abstract-multer-config.service';

export class UsersMulterConfigService extends AbstractMulterConfigService {
  protected getSubdirectory(): string {
    return '/users';
  }
}
