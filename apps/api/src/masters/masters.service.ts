import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliverablesService } from 'src/deliverables/deliverables.service';
import { FileEntity } from 'src/files/entities/file.entity';
import { FilesService } from 'src/files/files.service';
import { ProfilesService } from 'src/profiles/profiles.service';
import { ReviewsService } from 'src/reviews/reviews.service';
import { ShopEntity } from 'src/shops/entities/shop.entity';
import { ListByShopDto } from 'src/shops/query-dto/list-by-shop.dto';
import { copyKeys } from 'src/utils/helpers/copy-keys';
import { PaginationService } from 'src/utils/services/pagination/pagination.service';
import { In, Repository } from 'typeorm';
import { CreateMasterEntity } from './entities/create-master.entity';
import { MasterEntity } from './entities/master.entity';
import { UpdateMasterEntity } from './entities/update-master.entity';
import { ListAllMastersDto } from './query-dto/list-all-masters.dto';

@Injectable()
export class MastersService {
  constructor(
    @InjectRepository(MasterEntity)
    private readonly masterRepository: Repository<MasterEntity>,
    private readonly paginationService: PaginationService,
    private readonly deliverablesService: DeliverablesService,
    private readonly filesService: FilesService,
    private readonly profilesService: ProfilesService,
    private readonly reviewsService: ReviewsService,
  ) {}
  async create(dto: CreateMasterEntity) {
    return await this.saveValues(dto, new MasterEntity());
  }

  async findByShopIdPaginated(shopId: number, query: ListByShopDto) {
    const { limit, page } = query;
    const paginationOptions = this.paginationService.getPaginationOptions(
      limit,
      page,
    );
    const [masters, mastersTotal] = await this.masterRepository.findAndCount({
      where: {
        shops: {
          id: shopId,
        },
      },
      ...paginationOptions,
      order: { id: 'ASC' },
      relations: {
        profile: {
          user: true,
        },
        shops: true,
        img_file: true,
      },
    });

    let p = Promise.resolve(null);
    masters.forEach((master) => {
      p = p.then(() => {
        return this.reviewsService
          .countAndSumByMaster(master.id)
          .then((reviewsScores) => {
            const { quantity, total, avg } = reviewsScores;
            master.reviews_scores_count = quantity;
            master.reviews_scores_sum = total;
            master.reviews_scores_avg = avg;
          });
      });
    });

    return p.then(() =>
      this.paginationService.getJsonObject<MasterEntity[]>(
        masters,
        mastersTotal,
        limit,
        page,
      ),
    );
  }

  async findAllPaginated(query?: ListAllMastersDto) {
    const { city_id, deliverable_group_id, shop_id, limit, page } = query;

    let where = {};

    if (city_id) {
      where = { ...where, shops: { city: { id: city_id } } };
    }
    if (shop_id) {
      where = { ...where, shops: { id: shop_id } };
    }
    if (deliverable_group_id) {
      where = {
        ...where,
        deliverables: {
          deliverable_group: {
            id: deliverable_group_id,
          },
        },
      };
    }

    const paginationOptions = this.paginationService.getPaginationOptions(
      limit,
      page,
    );

    const [mastersByQuery, mastersTotal] =
      await this.masterRepository.findAndCount({
        where,
        ...paginationOptions,
        order: { id: 'ASC' },
      });
    const ids = mastersByQuery.map((m) => m.id);

    const masters = await this.masterRepository
      .createQueryBuilder('master')
      .leftJoinAndSelect('master.img_file', 'img_file')
      .leftJoinAndSelect('master.profile', 'profile')
      .leftJoinAndSelect('profile.user', 'user')
      .leftJoinAndSelect('user.avatar', 'avatar')
      .leftJoinAndSelect('master.shops', 'shop')
      .leftJoinAndSelect('master.deliverables', 'deliverable')
      .leftJoinAndSelect('deliverable.deliverable_group', 'deliverable_group')
      .leftJoinAndSelect('shop.city', 'city')
      .where({ id: In(ids) })
      .orderBy('master.id', 'ASC')
      .getMany();

    const asyncForEach = async (
      masters: MasterEntity[],
      callback: (master: MasterEntity) => void,
    ) => {
      for (let iMaster = 0; iMaster < masters.length; iMaster++) {
        await callback(masters[iMaster]);
      }
    };

    await asyncForEach(masters, async (master: MasterEntity) =>
      this.reviewsService
        .countAndSumByMaster(master.id)
        .then((reviewsScores) => {
          const { quantity, total, avg } = reviewsScores;
          master.reviews_scores_count = quantity;
          master.reviews_scores_sum = total;
          master.reviews_scores_avg = avg;
        }),
    );

    return this.paginationService.getJsonObject<MasterEntity[]>(
      masters,
      mastersTotal,
      limit,
      page,
    );
  }

  async findById(id: number) {
    return await this.masterRepository.findOneOrFail({
      where: { id },
    });
  }

  async findReviewsByMaster(id: number) {
    const master = await this.masterRepository.findOneOrFail({
      where: { id },
      relations: ['deliverables', 'profile.user'],
    });

    master.reviews = await this.reviewsService.findByMaster(master.id);

    return master;
  }

  async update(id: number, dto: UpdateMasterEntity) {
    const master = await this.masterRepository.findOneByOrFail({ id });
    return await this.saveValues(dto, master);
  }

  async remove(id: number) {
    const master = await this.masterRepository.findOneOrFail({
      where: { id },
      relations: ['img_file'],
    });

    const toRemove = { ...master };

    await this.masterRepository.remove(master);
    await this.filesService.remove(toRemove.img_file.id);
    return toRemove;
  }

  private async saveValues(
    dto: CreateMasterEntity | UpdateMasterEntity,
    master: MasterEntity,
  ) {
    const keys = ['profession', 'description'];
    master = copyKeys(keys, dto, master);

    const { fileId, deliverables, shops, userId } = dto;

    if (fileId) {
      const file = new FileEntity();
      file.id = fileId;
      master.img_file = file;
    }

    if (deliverables) {
      master.deliverables = await this.deliverablesService.findByIds(
        deliverables,
      );
    }

    if (shops) {
      const shopEntities = shops.map((id) => {
        const shop = new ShopEntity();
        shop.id = id;
        return shop;
      });
      master.shops = shopEntities;
    }

    if (userId) {
      master.profile = await this.profilesService.findMaster(userId);
    }

    return this.masterRepository.save(master);
  }
}
