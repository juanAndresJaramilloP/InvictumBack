import { Module } from '@nestjs/common';
import { ReporteService } from './reporte.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReporteEntity } from './reporte.entity/reporte.entity';

@Module({
  providers: [ReporteService],
  imports: [TypeOrmModule.forFeature([ReporteEntity])],
})
export class ReporteModule {}
