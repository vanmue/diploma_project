import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from 'src/files/entities/file.entity';
import { FilesService } from 'src/files/files.service';
import { ShopEntity } from 'src/shops/entities/shop.entity';
import { copyKeys } from 'src/utils/copy-keys';
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
  ) {}
  async create(dto: CreateShopImageEntity) {
    return await this.saveValues(dto, new ShopImageEntity());
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
    const updated = await this.saveValues(dto, shopImage);
    if (previousFileId) {
      await this.filesService.remove(previousFileId);
    }
    return updated;
  }
  private async saveValues(
    dto: CreateShopImageEntity | UpdateShopImageEntity,
    image: ShopImageEntity,
  ) {
    image = copyKeys(['is_preview'], dto, image);
    const { shopId, fileId } = dto;
    if (shopId) {
      const shop = new ShopEntity();
      shop.id = shopId;
      image.shop = shop;
    }
    if (fileId) {
      const file = new FileEntity();
      file.id = fileId;
      image.file = file;
    }
    return await this.shopImageRepository.save(image);
  }
}
