import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { CitiesModule } from './cities/cities.module';
import { DeliverableGroupsModule } from './deliverables/groups/deliverable-groups.module';
import { MastersModule } from './masters/masters.module';
import { JsonService } from './services/json/json.service';
import { ShopAdvantagesModule } from './shops/shop-advantages/shop-advantages.module';
import { ShopsModule } from './shops/shops.module';
import { TestResponseModule } from './test-response/test-response.module';
import { UsersModule } from './users/users.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { DeliverablesModule } from './deliverables/deliverables.module';
import { DecimalService } from './services/decimal/decimal.service';

const synchronize = process.env.NODE_ENV !== 'production';

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
        synchronize,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),

    TestResponseModule,
    DeliverableGroupsModule,
    ShopsModule,
    CitiesModule,
    ShopAdvantagesModule,
    MastersModule,
    UsersModule,
    AppointmentsModule,
    DeliverablesModule,
  ],
  controllers: [],
  providers: [JsonService, DecimalService],
})
export class AppModule {}
