import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  // default/other underlying http servers have type extends INestApplication, no need to state if no use
  const app = await NestFactory.create<INestApplication>(
    AppModule,
  );

  // documentation
  // https://docs.nestjs.com/openapi/introduction
  SwaggerModule.setup(
    '/docs',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder().setTitle("Documentation for nest playground.").build(),
    )
  );

  await app.listen(3000);
}
bootstrap();
