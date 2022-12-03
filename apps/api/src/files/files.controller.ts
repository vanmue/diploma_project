import {
  BadRequestException,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
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

  @Get(':id')
  async getFIle(@Param('id') id: number) {
    const data = await this.filesService.findById(id);
    return this.jsonService.data(data);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file: Express.Multer.File) {
    this.validateFile(file);

    const data = await this.filesService.create(file);
    return this.jsonService.data(data);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const data = await this.filesService.remove(id);
    return this.jsonService.data(data);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    this.validateFile(file);
    const data = await this.filesService.update(id, file);
    return this.jsonService.data(data);
  }

  private validateFile(file: Express.Multer.File) {
    if (file == null) {
      const json = this.jsonService.errors({ file: 'undefined' });
      throw new BadRequestException(json);
    }
  }
}
