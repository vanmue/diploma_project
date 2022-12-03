import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesService } from 'src/files/files.service';
import { ShopsService } from 'src/shops/shops.service';
import { Repository } from 'typeorm';
import { CreateShopImageEntity } from './entities/create-shop-image.entity';
import { ShopImageEntity } from './entities/shop-image.entity';
import { UpdateShopImageEntity } from './entities/update-shop-image.entity';

@Injectable()
export class ShopImagesService {
  constructor(
    @InjectRepository(ShopImageEntity)
    private readonly shopImageRepository: Repository<ShopImageEntity>,
    private readonly filesService: FilesService,
    private readonly shopsService: ShopsService,
  ) {}
  async create(dto: CreateShopImageEntity) {
    const values = await this.getValues(dto);
    return await this.shopImageRepository.save(values);
  }
  async findAll() {
    return await this.shopImageRepository.find({ relations: ['file'] });
  }
  async findById(id: number) {
    return await this.shopImageRepository.findOneByOrFail({ id });
  }
  async remove(id: number) {
    const shopImage = await this.shopImageRepository.findOneOrFail({
      where: { id },
      relations: ['file'],
    });
    const toRemove = { ...shopImage };
    const fileId = shopImage.file.id;
    await this.shopImageRepository.remove(shopImage);
    await this.filesService.remove(fileId);
    return toRemove;
  }
  async update(id: number, dto: UpdateShopImageEntity) {
    const shopImage = await this.shopImageRepository.findOneOrFail({
      where: { id },
      relations: ['file'],
    });
    let previousFileId: number;
    if (dto.fileId && dto.fileId != shopImage.file.id) {
      previousFileId = shopImage.file.id;
    }
    let values = await this.getValues(dto);
    values = { ...shopImage, ...values };
    const updated = await this.shopImageRepository.save(values);
    if (previousFileId) {
      await this.filesService.remove(previousFileId);
    }
    return updated;
  }
  private async getValues(dto: CreateShopImageEntity | UpdateShopImageEntity) {
    let values = {};
    const { shopId, fileId, is_preview } = dto;
    if (shopId) {
      const shop = await this.shopsService.findById(shopId);
      values = { ...values, shop };
    }
    if (fileId) {
      const file = await this.filesService.findById(fileId);
      values = { ...values, file };
    }
    if (is_preview) {
      values = { ...values, is_preview };
    }
    return values;
  }
}
