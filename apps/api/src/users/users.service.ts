import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { FileEntity } from 'src/files/entities/file.entity';
import { FilesService } from 'src/files/files.service';
import { copyKeys } from 'src/utils/copy-keys';
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
    return await this.saveValues(dto, new UserEntity());
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
    const updated = await this.saveValues(dto, user);
    if (previousFileId) {
      await this.filesService.remove(previousFileId);
    }
    return updated;
  }
  private async saveValues(
    dto: CreateUserEntity | UpdateUserEntity,
    user: UserEntity,
  ) {
    const scalars = ['name', 'surname', 'email'];
    user = copyKeys(scalars, dto, user);
    const { password, avatarId } = dto;
    if (password) {
      user.password = await hash(password, 10);
    }
    if (avatarId) {
      const file = new FileEntity();
      file.id = avatarId;
      user.avatar = file;
    }
    return await this.userRepository.save(user);
  }
}
