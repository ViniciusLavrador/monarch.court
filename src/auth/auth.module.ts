import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigInterface } from 'src/config';
import { AuthController } from 'src/auth/controllers/auth.controller';
import { User, UserSchema } from 'src/auth/entities/user.entity';
import { AuthService } from 'src/auth/services/auth.service';
import { JwtService } from 'src/auth/services/jwt.service';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { UserManagementController } from './controllers/user-management.controller';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService<ConfigInterface>) => ({
        secret: configService.get('JWT_ACCESS_TOKEN_SECRET', { infer: true }),
        signOptions: { expiresIn: configService.get('JWT_ACCESS_TOKEN_EXPIRES_IN', { infer: true }) },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController, UserManagementController],
  providers: [AuthService, JwtService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
