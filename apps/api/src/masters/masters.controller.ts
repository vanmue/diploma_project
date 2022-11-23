import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { JsonObject } from 'src/libs/src/models/JsonObject';
import { JsonService } from 'src/services/json/json.service';
import { CreateMasterEntity } from './entities/create-master.entity';
import { MasterEntity } from './entities/master.entity';
import { ListAllMastersDto } from './list-all-masters-dto';
import { MastersService } from './masters.service';

@Controller('masters')
@UseInterceptors(ClassSerializerInterceptor)
export class MastersController {
  constructor(
    private readonly mastersService: MastersService,
    private readonly jsonService: JsonService,
  ) {}

  @Get()
  async getAll(@Query() query: ListAllMastersDto) {
    return await this.mastersService.findAllPaginated(query);
  }

  @Post()
  async create(
    @Body() dto: CreateMasterEntity,
  ): Promise<JsonObject<MasterEntity>> {
    const data = await this.mastersService.create(dto);
    return this.jsonService.data(data);
  }
}
