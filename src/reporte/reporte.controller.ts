import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ReporteDto } from './reporte.dto';
import { ReporteEntity } from './reporte.entity/reporte.entity';
import { ReporteService } from './reporte.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';

@Controller('reportes')
@UseInterceptors(BusinessErrorsInterceptor)
export class ReporteController {

    constructor(
        private readonly reporteService: ReporteService
    ){}

    @Get()
    async findAll() {
      return await this.reporteService.findAll();
    }

    @Get(':reporteId')
    async findOne(@Param('reporteId') reporteId: string) {
      return await this.reporteService.findOne(reporteId);
    }

    @Post()
    async create(@Body() reporteDto: ReporteDto) {
      const reporte: ReporteEntity = plainToInstance(ReporteEntity, reporteDto);
      return await this.reporteService.create(reporte);
    }

    @Put(':reporteId')
    async update(@Param('reporteId') reporteId: string, @Body() reporteDto: ReporteDto) {
      const reporte: ReporteEntity = plainToInstance(ReporteEntity, reporteDto);
      return await this.reporteService.update(reporteId, reporte);
    }

    @Delete(':reporteId')
    @HttpCode(204)
    async delete(@Param('reporteId') reporteId: string) {
      return await this.reporteService.delete(reporteId);
    }

}
