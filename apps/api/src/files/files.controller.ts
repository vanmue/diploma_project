import {
  ClassSerializerInterceptor,
  Controller,
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

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file: Express.Multer.File) {
    const data = await this.filesService.create(file);
    return this.jsonService.data(data);
  }
}
