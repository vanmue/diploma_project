import { Injectable } from '@nestjs/common';
import { MulterOptionsFactory } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 } from 'uuid';

@Injectable()
export abstract class AbstractMulterConfigService
  implements MulterOptionsFactory
{
  createMulterOptions(): MulterOptions | Promise<MulterOptions> {
    return {
      storage: diskStorage({
        destination: `/uploads${this.getSubdirectory()}`,
        filename: (
          req: Request,
          file: Express.Multer.File,
          next: (error: Error, filename: string) => void,
        ) => {
          const { originalname } = file;
          const ext = extname(originalname);
          return next(null, `/${v4()}${ext}`);
        },
      }),
    };
  }
  protected getSubdirectory(): string {
    throw new Error('protected method call');
  }
}
