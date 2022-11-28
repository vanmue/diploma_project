import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
  async findById(id: number) {
    return await this.fileRepository.findOneByOrFail({ id });
  }
}
