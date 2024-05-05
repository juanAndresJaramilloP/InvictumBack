import { Module } from '@nestjs/common';
import { TemaeducativoRecursoeducativoService } from './temaeducativo-recursoeducativo.service';
import { TemaEducativoEntity } from '../tema-educativo/tema-educativo.entity/tema-educativo.entity';
import { RecursoEducativoEntity } from '../recurso-educativo/recurso-educativo.entity/recurso-educativo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [TemaeducativoRecursoeducativoService],
  imports: [TypeOrmModule.forFeature([TemaEducativoEntity, RecursoEducativoEntity])],
})
export class TemaeducativoRecursoeducativoModule {}
