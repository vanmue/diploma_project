import { PickType } from '@nestjs/swagger';
import { FileEntity } from './file.entity';

export class CreateFileEntity extends PickType(FileEntity, [
  'originalname' as const,
  'path' as const,
  'mimetype' as const,
  'size' as const,
]) {}
