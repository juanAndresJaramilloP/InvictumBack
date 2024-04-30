import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reporte } from './reporte.entity/reporte.entity.js';
import { ReportesService } from './reporte.service/reporte.service.js';
import { ReportesController } from './reporte.controller/reporte.controller.js';

@Module({
    imports: [TypeOrmModule.forFeature([Reporte])],
    providers: [ReportesService],
    controllers: [ReportesController],
})
export class ReporteModule {}
