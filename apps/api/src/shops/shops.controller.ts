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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JsonObject } from 'src/libs/src/models/JsonObject';
import { MastersService } from 'src/masters/masters.service';
import { RequirePermissions } from 'src/utils/decorators/require-permissions.decorator';
import { PermissionsGuard } from 'src/utils/guards/permissions/permissions.guard';
import { JsonService } from 'src/utils/services/json/json.service';
import { CreateShopEntity } from './entities/create-shop.entity';
import { ShopEntity } from './entities/shop.entity';
import { UpdateShopEntity } from './entities/update-shop.entity';
import { ListAllDto } from './query-dto/list-all.dto';
import { ListByShopDto } from './query-dto/list-by-shop.dto';
import { ShopsPermission } from './shops.permission';
import { ShopsService } from './shops.service';

@Controller('shops')
@UseInterceptors(ClassSerializerInterceptor)
export class ShopsController {
  constructor(
    private readonly shopsService: ShopsService,
    private readonly jsonService: JsonService,
    private readonly mastersService: MastersService,
  ) {}

  @Get()
  @ApiResponse({ type: ShopEntity, isArray: true })
  async getAll(@Query() query: ListAllDto) {
    return await this.shopsService.findAllPaginated(query);
  }

  @Get(':id')
  @ApiResponse({ type: ShopEntity })
  async getById(@Param('id') id: number) {
    const data = await this.shopsService.findInfoById(id);
    return this.jsonService.data(data);
  }

  @Get(':id/masters')
  @ApiResponse({ type: ShopEntity })
  async getMastersById(@Param('id') id: number, @Query() query: ListByShopDto) {
    return await this.mastersService.findByShopIdPaginated(id, query);
  }

  @Post()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions(ShopsPermission.ALL_SHOP)
  @ApiResponse({ type: ShopEntity })
  async create(@Body() dto: CreateShopEntity): Promise<JsonObject<ShopEntity>> {
    const data = await this.shopsService.create(dto);
    return this.jsonService.data(data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions(ShopsPermission.ALL_SHOP)
  @ApiResponse({ type: ShopEntity })
  async remove(@Param('id') id: number) {
    const data = await this.shopsService.remove(id);
    return this.jsonService.data(data);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions(ShopsPermission.EDIT_SHOP)
  @ApiResponse({ type: ShopEntity })
  async update(@Param('id') id: number, @Body() dto: UpdateShopEntity) {
    const data = await this.shopsService.update(id, dto);
    return this.jsonService.data(data);
  }
}
