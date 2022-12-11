import { Injectable } from '@nestjs/common';
import { ProfileType } from 'src/profile-types/profile.type';
import { ProfilesService } from 'src/profiles/profiles.service';

@Injectable()
export class ShopPoliciesService {
  constructor(private readonly profilesService: ProfilesService) {}
  async canEditShop(userId: number) {
    const profiles = await this.profilesService.findByUser(userId);
    return profiles.some((profile) =>
      [String(ProfileType.Root), String(ProfileType.ShopManager)].includes(
        profile.profile_type,
      ),
    );
  }
  async canManageShop(userId) {
    const profile = await this.profilesService.findByUserAndProfileType(
      userId,
      ProfileType.Root,
    );
    return !!profile;
  }
}
