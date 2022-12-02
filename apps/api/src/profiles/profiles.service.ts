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
  async findProfile(userId: number, type: ProfileType) {
    return await this.profileRepository.findOne({
      where: {
        user: {
          id: userId,
        },
        profile_type: type,
      },
    });
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
  private async saveValues(
    dto: CreateProfileEntity | UpdateProfileEntity,
    values: ProfileEntity,
  ) {
    if (dto.profile_type) {
      values.profile_type = dto.profile_type;
    }
    if (dto.userId) {
      values.user = await this.usersService.findById(dto.userId);
    }
    return await this.profileRepository.save(values);
  }
}
