import { Module } from '@nestjs/common';
import { GestorService } from './gestor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GestorEntity } from './gestor.entity/gestor.entity';

@Module({
  providers: [GestorService],
  imports: [TypeOrmModule.forFeature([GestorEntity])],
})
export class GestorModule {}
