import { Injectable } from '@nestjs/common';
import { CustomersService } from 'src/customers/customers.service';
import { MastersService } from 'src/masters/masters.service';
import { ShopsService } from 'src/shops/shops.service';

@Injectable()
export class MeService {
  constructor(
    private readonly mastersService: MastersService,
    private readonly customersService: CustomersService,
    private readonly shopsService: ShopsService,
  ) {}
  async findProfiles(userId: number) {
    let profiles = [];
    const masters = await this.mastersService.findMeProfilesByUser(userId);
    if (masters) {
      profiles = [...profiles, ...masters];
    }
    const customers = await this.customersService.findMeProfilesByUser(userId);
    if (customers) {
      profiles = [...profiles, ...customers];
    }

    const mapped = profiles.map((entity) => ({
      id: entity.profile.id,
      profile_type: entity.profile.profile_type,
      entity_id: entity.id,
    }));

    const shops = await this.shopsService.findShopManagerMeByUser(userId);
    shops.forEach((shop) => {
      shop.manager_profiles.forEach((profile) => {
        mapped.push({
          id: profile.id,
          profile_type: profile.profile_type,
          entity_id: shop.id,
        });
      });
    });
    return mapped;
  }
}
