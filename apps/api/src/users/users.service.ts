import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { FilesService } from 'src/files/files.service';
import { Repository } from 'typeorm';
import { CreateUserEntity } from './entities/create-user.entity';
import { UpdateUserEntity } from './entities/update-user.entity';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly filesService: FilesService,
  ) {}
  async create(dto: CreateUserEntity) {
    const values = await this.getValues(dto);
    return await this.userRepository.save(values);
  }
  async findAll() {
    return await this.userRepository.find({ relations: ['profiles'] });
  }
  async findByEmail(email: string) {
    return await this.userRepository.findOneOrFail({
      where: { email },
      select: ['id', 'email', 'password'],
    });
  }
  async findById(id: number) {
    return await this.userRepository.findOneByOrFail({ id });
  }
  async remove(id: number) {
    const user = await this.userRepository.findOneOrFail({
      where: { id },
      relations: ['avatar'],
    });
    const fileId = user.avatar.id;
    const toRemove = { ...user };
    await this.userRepository.remove(user);
    await this.filesService.remove(fileId);
    return toRemove;
  }
  async update(id: number, dto: UpdateUserEntity) {
    const user = await this.userRepository.findOneOrFail({
      where: { id },
      relations: ['avatar'],
    });
    let previousFileId: number;
    if (dto.avatarId && dto.avatarId != user.avatar.id) {
      previousFileId = user.avatar.id;
    }
    let values = await this.getValues(dto);
    values = { ...user, ...values };
    const updated = await this.userRepository.save(values);
    if (previousFileId) {
      await this.filesService.remove(previousFileId);
    }
    return updated;
  }
  private async getValues(dto: CreateUserEntity | UpdateUserEntity) {
    let values = {};
    const scalars = ['name', 'surname', 'email', 'password'];
    scalars.forEach((s) => {
      if (dto[s]) {
        values = { ...values, [s]: dto[s] };
      }
    });
    const { password, avatarId } = dto;
    if (password) {
      const hashed = await hash(password, 10);
      values = { ...values, password: hashed };
    }
    if (avatarId) {
      const file = await this.filesService.findById(avatarId);
      values = { ...values, avatar: file };
    }
    return values;
  }
}
