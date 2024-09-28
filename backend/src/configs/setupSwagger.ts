import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication): void => {
  const options = new DocumentBuilder()
    .setTitle('Siso-balance-game')
    .setDescription('Siso-balance-game의 api 문서입니다.')
    .setVersion('1.0.0')
    .addCookieAuth('accessToken') // 이 부분이 핵심입니다
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
};
