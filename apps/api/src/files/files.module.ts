import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { JsonService } from 'src/services/json/json.service';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { FilesMulterConfigService } from './multer-config-services/files-multer-config.service';

@Module({
  providers: [FilesService, JsonService, FilesMulterConfigService],
  controllers: [FilesController],
  exports: [FilesService],
  imports: [
    MulterModule.registerAsync({
      useClass: FilesMulterConfigService,
    }),
  ],
})
export class FilesModule {}
