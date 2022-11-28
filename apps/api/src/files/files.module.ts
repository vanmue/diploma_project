import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JsonService } from 'src/services/json/json.service';
import { FileEntity } from './entities/file.entity';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { FilesMulterConfigService } from './multer-config-services/files-multer-config.service';

@Module({
  providers: [FilesService, JsonService],
  controllers: [FilesController],
  exports: [FilesService],
  imports: [
    MulterModule.registerAsync({
      useClass: FilesMulterConfigService,
    }),
    TypeOrmModule.forFeature([FileEntity]),
  ],
})
export class FilesModule {}
