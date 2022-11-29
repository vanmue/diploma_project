import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JsonService } from 'src/services/json/json.service';
import { FilesService } from './files.service';

@Controller('files')
@UseInterceptors(ClassSerializerInterceptor)
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly jsonService: JsonService,
  ) {}

  @Get()
  async getAll() {
    const data = await this.filesService.findAll();
    return this.jsonService.data(data);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file: Express.Multer.File) {
    if (file == null) {
      return this.jsonService.errors({ file: 'undefined' });
    }

    const data = await this.filesService.create(file);
    return this.jsonService.data(data);
  }
}
