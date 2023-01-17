import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { UserService } from 'src/user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/user.model';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule, 
    PassportModule, 
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]), 
    JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '3600s' },
  }),],
  providers: [AuthService, LocalStrategy, UserService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
