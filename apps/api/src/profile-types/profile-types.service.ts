import { Injectable } from '@nestjs/common';
import { ProfileType } from 'src/profile-types/profile.type';

@Injectable()
export class ProfileTypesService {
  findAll() {
    return Object.values(ProfileType);
  }
}
