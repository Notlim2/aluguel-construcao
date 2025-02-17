import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AnonymousStrategy } from './strategies/anonymous.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AnonymousStrategy],
  exports: [AuthService],
})
export class AuthModule {}
