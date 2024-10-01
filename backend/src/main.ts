import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { setupSwagger } from 'src/configs/setupSwagger';

async function bootstrap() {
  const logger = new Logger();
  const port = process.env.PORT || 80;
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://siso-balance-game.com',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.use(cookieParser());
  setupSwagger(app);
  await app.listen(port);
  logger.log(`Application is running on: ${port}`);
}
bootstrap();
