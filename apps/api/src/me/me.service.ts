import { Injectable } from '@nestjs/common';
import { CustomersService } from 'src/customers/customers.service';
import { MastersService } from 'src/masters/masters.service';
import { ShopManagersService } from 'src/shop-managers/shop-managers.service';

@Injectable()
export class MeService {
  constructor(
    private readonly mastersService: MastersService,
    private readonly customersService: CustomersService,
    private readonly shopManagersService: ShopManagersService,
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
    const shopManagers = await this.shopManagersService.findMeProfilesByUser(
      userId,
    );
    if (shopManagers) {
      profiles = [...profiles, ...shopManagers];
    }
    return profiles.map((entity) => ({
      id: entity.profile.id,
      profile_type: entity.profile.profile_type,
      entity_id: entity.id,
    }));
  }
}
