import { Module } from '@nestjs/common';
import { ReporteService } from './reporte.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReporteEntity } from './reporte.entity/reporte.entity';
import { ReporteController } from './reporte.controller';

@Module({
  providers: [ReporteService],
  imports: [TypeOrmModule.forFeature([ReporteEntity])],
  controllers: [ReporteController],
})
export class ReporteModule {}
