import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { DOC_TAGS } from './common/contants/doc-tags.constants';
import { applyDocTags } from './common/helpers/setup.helpers';
import { ConfigInterface } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // Instantiate config service
  const configService = app.get<ConfigService<ConfigInterface>>(ConfigService);

  // Validate and Transform Global Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Documentation
  SwaggerModule.setup(
    'docs',
    app,
    SwaggerModule.createDocument(
      app,
      applyDocTags(
        new DocumentBuilder()
          .setTitle('Monarch API Documentation')
          .setDescription('Monarch API Description')
          .setVersion('1.0'),
        DOC_TAGS,
      ).build(),
    ),
    { customSiteTitle: 'Monarch API Documentation | Swagger UI' },
  );

  const port = configService.get('PORT', { infer: true });
  await app.listen(port);
}
bootstrap();
