import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { rm } from 'fs/promises';
import { Repository } from 'typeorm';
import { CreateFileEntity } from './entities/create-file.entity';
import { FileEntity } from './entities/file.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}
  async create(file: Express.Multer.File) {
    const dto: CreateFileEntity = {
      originalname: file.originalname,
      path: file.path,
      mimetype: file.mimetype,
      size: file.size,
    };
    return await this.fileRepository.save(dto);
  }

  async findAll() {
    return await this.fileRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async findById(id: number) {
    return await this.fileRepository.findOneByOrFail({ id });
  }

  async remove(id: number) {
    const file = await this.fileRepository.findOneByOrFail({ id });
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
    return file;
  }

  private async deleteFile(path: string) {
    await rm(path);
  }
}
