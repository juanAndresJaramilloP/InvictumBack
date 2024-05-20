import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteEntity } from '../cliente/cliente.entity/cliente.entity';
import { GestorEntity } from '../gestor/gestor.entity/gestor.entity';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [UserService,AuthService,JwtService],
  imports: [TypeOrmModule.forFeature([ClienteEntity, GestorEntity])],
  controllers: [UserController]
})
export class UserModule {}
