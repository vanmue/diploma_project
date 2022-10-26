import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { GroupEntity } from './deliverables/groups/group.entity';
import { GroupsModule } from './deliverables/groups/groups.module';
import { TestResponseModule } from './test-response/test-response.module';
import { JsonService } from './json/json.service';
import { ShopsModule } from './shops/shops.module';

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
        entities: [GroupEntity],
      }),
      inject: [ConfigService],
    }),

    TestResponseModule,
    GroupsModule,
    ShopsModule,
  ],
  controllers: [],
  providers: [JsonService],
})
export class AppModule {}
