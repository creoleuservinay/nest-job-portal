import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { join } from 'path/posix';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api/');
  app.use(
    session({
      name: 'NestSession',
      secret: 'apdjdjjdjdj',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000
      }
    }),
  );
  

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'src/public/views'));
  app.setViewEngine('hbs');
  app.enableVersioning({
    type: VersioningType.URI,
  });
  const config = new DocumentBuilder()
    .setTitle('Job portal API')
    .setDescription('The Job API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swaggerapi', app, document);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  await app.listen(3000);
}
bootstrap();
