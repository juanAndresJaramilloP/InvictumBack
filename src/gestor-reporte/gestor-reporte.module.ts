import { Module } from '@nestjs/common';
import { GestorReporteService } from './gestor-reporte.service';
import { GestorEntity } from '../gestor/gestor.entity/gestor.entity';
import { ReporteEntity } from '../reporte/reporte.entity/reporte.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GestorReporteController } from './gestor-reporte.controller';

@Module({
  providers: [GestorReporteService],
  imports: [TypeOrmModule.forFeature([GestorEntity, ReporteEntity])],
  controllers: [GestorReporteController],
})
export class GestorReporteModule {}
