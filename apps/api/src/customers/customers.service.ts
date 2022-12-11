import { Injectable } from '@nestjs/common';
import { ProfileType } from 'src/profile-types/profile.type';
import { ProfilesService } from 'src/profiles/profiles.service';

@Injectable()
export class CustomersService {
  constructor(private readonly profilesService: ProfilesService) {}
  async findMeProfilesByUser(userId: number) {
    const customers = [];
    const user = await this.profilesService.findByUserAndProfileType(
      userId,
      ProfileType.Customer,
    );
    if (user) {
      const customer = { profile: user };
      customers.push(customer);
    }
    return customers;
  }
}
