import { Module } from '@nestjs/common';
import { GestorService } from './gestor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GestorEntity } from './gestor.entity/gestor.entity';
import { GestorController } from './gestor.controller';

@Module({
  providers: [GestorService],
  imports: [TypeOrmModule.forFeature([GestorEntity])],
  controllers: [GestorController],
})
export class GestorModule {}
