import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppointmentsModule } from './appointments/appointments.module';
import { AuthModule } from './auth/auth.module';
import { CitiesModule } from './cities/cities.module';
import { CustomersModule } from './customers/customers.module';
import { DeliverablesModule } from './deliverables/deliverables.module';
import { DeliverableGroupsModule } from './deliverables/groups/deliverable-groups.module';
import { FilesModule } from './files/files.module';
import { MastersModule } from './masters/masters.module';
import { MeModule } from './me/me.module';
import { ProfileTypesModule } from './profile-types/profile-types.module';
import { ProfilesModule } from './profiles/profiles.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ShopImagesModule } from './shop-images/shop-images.module';
import { ShopManagersModule } from './shop-managers/shop-managers.module';
import { ImagesByShopModule } from './shops/images-by-shop/images-by-shop.module';
import { ShopAdvantagesModule } from './shops/shop-advantages/shop-advantages.module';
import { ShopsModule } from './shops/shops.module';
import { TestResponseModule } from './test-response/test-response.module';
import { UsersModule } from './users/users.module';
import { HttpExceptionFilter } from './utils/filters/exception/http-exception.filter';
import { DecimalService } from './utils/services/decimal/decimal.service';
import { FakerService } from './utils/services/faker/faker.service';
import { JsonService } from './utils/services/json/json.service';
import { PaginationService } from './utils/services/pagination/pagination.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // подключаем в режиме глобального объекта*
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api*'],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_DATABASE'),
        synchronize: false,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),

    TestResponseModule,
    AppointmentsModule,
    AuthModule,
    CitiesModule,
    DeliverableGroupsModule,
    DeliverablesModule,
    FilesModule,
    ImagesByShopModule,
    MastersModule,
    ReviewsModule,
    ProfilesModule,
    ShopAdvantagesModule,
    ShopImagesModule,
    ShopsModule,
    UsersModule,
    ProfileTypesModule,
    MeModule,
    CustomersModule,
    ShopManagersModule,
  ],
  controllers: [],
  providers: [
    JsonService,
    DecimalService,
    FakerService,
    PaginationService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
