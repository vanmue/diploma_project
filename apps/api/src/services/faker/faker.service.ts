import { faker } from '@faker-js/faker/locale/ru';
import { Injectable } from '@nestjs/common';
import { DeliverablesService } from 'src/deliverables/deliverables.service';
import { CreateMasterEntity } from 'src/masters/entities/create-master.entity';
import { MastersService } from 'src/masters/masters.service';
import { CreateShopImageEntity } from 'src/shop-images/entities/create-shop-image.entity';
import { ShopImagesService } from 'src/shop-images/shop-images.service';
import { CreateShopEntity } from 'src/shops/entities/create-shop.entity';
import { ShopsService } from 'src/shops/shops.service';
import { CreateUserEntity } from 'src/users/entities/create-user.entity';
import { UsersService } from 'src/users/users.service';

const getIndex = (length: number) => Math.floor(Math.random() * length);

@Injectable()
export class FakerService {
  constructor(
    private readonly shopsService: ShopsService,
    private readonly shopImagesService: ShopImagesService,
    private readonly usersService: UsersService,
    private readonly mastersService: MastersService,
    private readonly deliveravlesService: DeliverablesService,
  ) {}
  async createMasters(quantity: number) {
    const professions = [
      'мастер парикмахер',
      'мастер маникюра',
      'мастер визажист',
    ];

    const deliverables = await this.deliveravlesService.findAll();
    const shops = (await this.shopsService.findAllPaginated({})).data;
    const images = [
      '/uploads/masters/svetlana_ivanova.png',
      '/uploads/masters/marina_svetlova.png',
      '/uploads/masters/nataliya_petrova.png',
    ];

    const avatars = [
      '/uploads/users/nataliya_petrova.png',
      '/uploads/users/marina_svetlova.png',
      '/uploads/users/svetlana_ivanova.png',
    ];

    let p = Promise.resolve(null);
    for (let iMaster = 0; iMaster < quantity; iMaster++) {
      p = p.then(() => {
        const user = new CreateUserEntity();
        user.name = faker.name.firstName();
        user.surname = faker.name.lastName();
        // user.avatar = avatars[getIndex(avatars.length)];
        console.log('user', user);
        return this.usersService.create(user);
      });
      p = p.then((user) => {
        const master = new CreateMasterEntity();
        master.userId = user.id;
        master.profession = professions[getIndex(professions.length)];
        master.description = faker.lorem.sentences();

        master.deliverables = [];
        for (let iDel = 0; iDel < 3; iDel++) {
          let delId: number;
          do {
            delId = deliverables[getIndex(deliverables.length)].id;
          } while (master.deliverables.includes(delId));
          master.deliverables.push(delId);
        }
        master.shops = [shops[getIndex(shops.length)].id];
        console.log('master', master);
        return this.mastersService.create(master);
      });
    }
    return p;
  }

  createShops(quantity: number) {
    let p = Promise.resolve(null);

    for (let iShop = 0; iShop < quantity; iShop++) {
      const working_start = Math.round(Math.random() * 3) + 8;
      const working_end = Math.round(Math.random() * 3) + 18;

      const shop = new CreateShopEntity();
      shop.cityId = Math.floor(Math.random() * 4) + 1;
      shop.advantages = [1];
      shop.name = faker.company.name();
      shop.address = faker.address.streetAddress();
      shop.working_time = `с ${working_start} до ${working_end} без выходных`;
      shop.working_start = working_start;
      shop.working_end = working_end;
      shop.phone = faker.phone.number();
      shop.center_longtitude = Number(faker.address.longitude());
      shop.center_latitude = Number(faker.address.latitude());
      shop.label_longtitude = Number(faker.address.longitude());
      shop.label_latitude = Number(faker.address.latitude());
      shop.zoom = Math.round(Math.random() * 8) + 1;

      p = p.then(() => {
        console.log('shop', shop);
        // return this.shopsService.create(shop);
      });
    }
    return p;
  }

  async createShopImages() {
    const shops = (await this.shopsService.findAllPaginated({})).data;

    const baseShop = shops?.find((shop) => shop.id == 1);
    if (baseShop == null) {
      return;
    }

    const { images } = baseShop;

    let p = Promise.resolve(null);
    shops.forEach((shop) => {
      const length = shop.images?.length && 0;
      const lack = 3 - length;
      for (let iImage = 0; iImage < lack; iImage++) {
        p = p.then(() => {
          const image = new CreateShopImageEntity();
          // image.img = images[iImage].img;
          // image.shopId = shop.id;
          // return this.shopImagesService.create(image);
        });
      }
    });
    return p;
  }
}
