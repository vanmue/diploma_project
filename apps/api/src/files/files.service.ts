import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { rm } from 'fs/promises';
import { copyKeys } from 'src/utils/helpers/copy-keys';
import { Repository } from 'typeorm';
import { FileEntity } from './entities/file.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}
  async create(file: Express.Multer.File) {
    return await this.saveValues(file, new FileEntity());
  }

  async findAll() {
    return await this.fileRepository
      .createQueryBuilder('file')
      .addSelect('file.originalname')
      .addSelect('file.mimetype')
      .addSelect('file.size')
      .getMany();
  }

  async findById(id: number) {
    return await this.fileRepository.findOneByOrFail({ id });
  }

  async remove(id: number) {
    const file = await this.fileRepository.findOneByOrFail({ id });
    const toRemove = { ...file };
    try {
      await this.fileRepository.remove(file);
    } catch (e) {
      // если файл используется в других строках таблиц
      // то срабатывает ограничение ON DELETE RESTRICT
      console.log(
        `удаление файла id = ${id} невозможно, т.к. используется в других строках таблиц`,
      );
      return null;
    }
    await this.deleteFile(file.path);
    return toRemove;
  }

  async update(id: number, file: Express.Multer.File) {
    const existing = await this.fileRepository.findOneByOrFail({ id });
    const { path } = existing;
    const updated = await this.saveValues(file, existing);
    await this.deleteFile(path);
    return updated;
  }

  private async deleteFile(path: string) {
    await rm(path);
  }
  private async saveValues(file: Express.Multer.File, dto: FileEntity) {
    const keys = ['originalname', 'path', 'mimetype', 'size'];
    dto = copyKeys(keys, file, dto);
    return await this.fileRepository.save(dto);
  }
}
