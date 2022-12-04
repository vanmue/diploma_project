import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { JsonObject } from 'src/libs/src/models/JsonObject';
import { JsonService } from 'src/utils/services/json/json.service';
import { CreateMasterEntity } from './entities/create-master.entity';
import { MasterEntity } from './entities/master.entity';
import { UpdateMasterEntity } from './entities/update-master.entity';
import { MastersService } from './masters.service';
import { ListAllMastersDto } from './query-dto/list-all-masters.dto';

@Controller('masters')
@UseInterceptors(ClassSerializerInterceptor)
export class MastersController {
  constructor(
    private readonly mastersService: MastersService,
    private readonly jsonService: JsonService,
  ) {}

  @Get(':id')
  async getMaster(@Param('id') id: number) {
    const data = await this.mastersService.findCard(id);
    return this.jsonService.data(data);
  }

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

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateMasterEntity) {
    const data = await this.mastersService.update(id, dto);
    return this.jsonService.data(data);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const data = await this.mastersService.remove(id);
    return this.jsonService.data(data);
  }
}
