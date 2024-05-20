import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import constants from '../shared/security/constants';
import { LocalStrategy } from './strategies/LocalStrategy';
import { JwtStrategy } from './strategies/JwtStrategy';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { ClienteEntity } from 'src/cliente/cliente.entity/cliente.entity';
import { GestorEntity } from 'src/gestor/gestor.entity/gestor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: constants.JWT_SECRET,
      signOptions: { expiresIn: constants.JWT_EXPIRES_IN },
    }),
    TypeOrmModule.forFeature([ClienteEntity, GestorEntity])
  ],
  providers: [AuthService, UserService, JwtService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
