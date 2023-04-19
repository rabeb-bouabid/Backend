/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from 'src/user/entities/user.entity';
import { AccessTokenStrategy } from './strategy/accesstoken.strategy';
import { RefreshTokenStrategy } from './strategy/refreshtoken.strategy';
import { AdminService } from 'src/admin/admin.service';
import { AdminModule } from 'src/admin/admin.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [UserModule,PassportModule, AdminModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, RefreshTokenStrategy, AccessTokenStrategy],
})
export class AuthModule {}
