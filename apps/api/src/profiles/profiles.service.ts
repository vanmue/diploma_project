import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateProfileEntity } from './entities/create-profile.entity';
import { ProfileEntity } from './entities/profile.entity';
import { UpdateProfileEntity } from './entities/update-profile.entity';
import { ProfileType } from './profile.type';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
    private readonly usersService: UsersService,
  ) {}
  async create(dto: CreateProfileEntity) {
    return this.saveValues(dto, new ProfileEntity());
  }
  async findAll() {
    return this.profileRepository.find();
  }
  async findById(id: number) {
    return await this.profileRepository.findOneByOrFail({ id });
  }
  async findMaster(userId: number) {
    return await this.findProfile(userId, ProfileType.Master);
  }
  async findCustomer(userId: number) {
    return await this.findProfile(userId, ProfileType.Customer);
  }
  async getTypes() {
    return Object.values(ProfileType);
  }
  async remove(id: number) {
    const profile = await this.profileRepository.findOneByOrFail({ id });
    const toRemove = { ...profile };
    await this.profileRepository.remove(profile);
    return toRemove;
  }
  async update(id: number, dto: UpdateProfileEntity) {
    const profile = await this.profileRepository.findOneByOrFail({ id });
    return await this.saveValues(dto, profile);
  }
  private async findProfile(userId: number, type: ProfileType) {
    const where = {
      user: {
        id: userId,
      },
      profile_type: type,
    };
    let profile = await this.profileRepository.findOne({ where });
    if (profile == null) {
      where.profile_type = ProfileType.Root;
      profile = await this.profileRepository.findOneOrFail({ where });
    }
    return profile;
  }
  private async saveValues(
    dto: CreateProfileEntity | UpdateProfileEntity,
    profile: ProfileEntity,
  ) {
    const { profile_type, userId } = dto;
    if (profile_type) {
      profile.profile_type = profile_type;
    }
    if (userId) {
      profile.user = await this.usersService.findById(userId);
    }
    return await this.profileRepository.save(profile);
  }
}
