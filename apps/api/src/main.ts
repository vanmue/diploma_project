import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = process.env.NODE_ENV == 'production' ? 80 : 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  await app.listen(port);
}
bootstrap();
