import { Injectable } from '@nestjs/common';
import { ProfileType } from 'src/profiles/profile.type';

@Injectable()
export class ProfileTypesService {
  findAll() {
    return Object.values(ProfileType);
  }
}
