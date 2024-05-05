import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ClienteReporteService } from './cliente-reporte.service';
import { ReporteDto } from '../reporte/reporte.dto';
import { ReporteEntity } from '../reporte/reporte.entity/reporte.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';

@Controller('clientes')
@UseInterceptors(BusinessErrorsInterceptor)
export class ClienteReporteController {

    constructor(
        private readonly clienteReporteService: ClienteReporteService
    ){}

    @Post(':clienteId/reportes/:reporteId')
    async addReporteCliente(@Param('clienteId') clienteId: string, @Param('reporteId') reporteId: string){
        return await this.clienteReporteService.addReporteCliente(clienteId, reporteId);
    }

    @Get(':clienteId/reportes/:reporteId')
    async getClienteReporte(@Param('clienteId') clienteId: string, @Param('reporteId') reporteId: string){
        return await this.clienteReporteService.getClienteReporte(clienteId, reporteId);
    }

    @Get(':clienteId/reportes')
    async getReportesCliente(@Param('clienteId') clienteId: string){
        return await this.clienteReporteService.getReportesCliente(clienteId);
    }

    @Put(':clienteId/reportes')
    async associateReportesCliente(@Body() reportesDto: ReporteDto[], @Param('clienteId') clienteId: string){
        const reportes = plainToInstance(ReporteEntity, reportesDto)
        return await this.clienteReporteService.associateReportesCliente(clienteId, reportes);
    }
    
    @Delete(':clienteId/reportes/:reporteId')
    @HttpCode(204)
    async removeReporteCliente(@Param('clienteId') clienteId: string, @Param('reporteId') reporteId: string){
        return await this.clienteReporteService.removeReporteCliente(clienteId, reporteId);
    }
}
