import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliverablesService } from 'src/deliverables/deliverables.service';
import { FilesService } from 'src/files/files.service';
import { ReviewsService } from 'src/reviews/reviews.service';
import { PaginationService } from 'src/services/pagination/pagination.service';
import { ListByShopDto } from 'src/shops/query-dto/list-by-shop.dto';
import { ShopsService } from 'src/shops/shops.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
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
    private readonly reviewsService: ReviewsService,
    private readonly shopsService: ShopsService,
    private readonly usersService: UsersService,
  ) {}
  async create(dto: CreateMasterEntity) {
    const { userId, shops, deliverables, fileId } = dto;

    const user = new UserEntity();
    user.id = userId;

    const shopEntities = await this.shopsService.findByIds(shops);

    const delivEntities = await this.deliverablesService.findByIds(
      deliverables,
    );

    let values = {};
    values = {
      ...values,
      ...dto,
      user,
      shops: shopEntities,
      deliverables: delivEntities,
    };

    if (fileId) {
      const img_file = await this.filesService.findById(fileId);
      if (img_file) {
        values = { ...values, img_file };
      }
    }

    return await this.masterRepository.save(values);
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
        user: true,
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
      .leftJoinAndSelect('master.user', 'user')
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
      relations: ['deliverables'],
    });

    master.reviews = await this.reviewsService.findByMaster(master.id);

    return master;
  }

  async update(id: number, dto: UpdateMasterEntity) {
    const master = await this.masterRepository.findOneByOrFail({ id });

    const keys = ['profession', 'description'];
    keys.forEach((key) => {
      if (dto[key]) {
        master[key] = dto[key];
      }
    });

    if (dto.userId) {
      master.user = await this.usersService.findById(dto.userId);
    }

    if (dto.fileId) {
      const img_file = await this.filesService.findById(dto.fileId);
      if (img_file) {
        master.img_file = img_file;
      }
    }

    if (dto.deliverables) {
      master.deliverables = await this.deliverablesService.findByIds(
        dto.deliverables,
      );
    }

    if (dto.shops) {
      master.shops = await this.shopsService.findByIds(dto.shops);
    }

    return await this.masterRepository.save(master);
  }
}
