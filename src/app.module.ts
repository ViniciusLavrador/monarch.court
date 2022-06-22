import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from 'src/app.controller';

import { ConfigInterface, loader, validationSchema } from 'src/config';
import { AuthModule } from 'src/auth/auth.module';
import { PropertyModule } from 'src/property/property.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [loader],
      validationSchema: validationSchema,
      expandVariables: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<ConfigInterface>) => ({
        uri: configService.get('DB_URI', { infer: true }),
        autoIndex: true,
      }),
    }),

    AuthModule,
    PropertyModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
