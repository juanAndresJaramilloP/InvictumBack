import { Module } from '@nestjs/common';
import { ClienteReporteService } from './cliente-reporte.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteEntity } from '../cliente/cliente.entity/cliente.entity';
import { ReporteEntity } from '../reporte/reporte.entity/reporte.entity';
import { ClienteReporteController } from './cliente-reporte.controller';

@Module({
  providers: [ClienteReporteService],
  imports: [TypeOrmModule.forFeature([ClienteEntity, ReporteEntity])],
  controllers: [ClienteReporteController],
})
export class ClienteReporteModule {}
