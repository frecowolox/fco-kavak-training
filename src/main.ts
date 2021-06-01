import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3000;

  await app.listen(port);
  Logger.verbose(`Server listening on http://localhost:${port}`);
}
bootstrap();
