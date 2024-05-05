import { Module } from '@nestjs/common';
import { ClienteReporteService } from './cliente-reporte.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteEntity } from '../cliente/cliente.entity/cliente.entity';
import { ReporteEntity } from '../reporte/reporte.entity/reporte.entity';

@Module({
  providers: [ClienteReporteService],
  imports: [TypeOrmModule.forFeature([ClienteEntity, ReporteEntity])],
})
export class ClienteReporteModule {}
