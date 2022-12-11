import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { copyKeys } from 'src/utils/helpers/copy-keys';
import { Repository } from 'typeorm';
import { ProfileType } from '../profile-types/profile.type';
import { CreateProfileEntity } from './entities/create-profile.entity';
import { ProfileEntity } from './entities/profile.entity';
import { UpdateProfileEntity } from './entities/update-profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
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
  async findByUser(userId: number) {
    return await this.profileRepository
      .createQueryBuilder()
      .where('"userId" = :userId', { userId })
      .getMany();
  }
  async findByUserAndProfileType(userId: number, profileType: ProfileType) {
    return await this.profileRepository.findOne({
      where: {
        user: {
          id: userId,
        },
        profile_type: profileType,
      },
    });
  }
  async findMaster(userId: number) {
    return await this.findProfile(userId, ProfileType.Master);
  }
  async findCustomer(userId: number) {
    return await this.findProfile(userId, ProfileType.Customer);
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
    profile = copyKeys(['profile_type'], dto, profile);

    const { userId } = dto;
    if (userId) {
      const user = new UserEntity();
      user.id = userId;
      profile.user = user;
    }
    return await this.profileRepository.save(profile);
  }
}
