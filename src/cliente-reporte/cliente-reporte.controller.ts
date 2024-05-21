import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ClienteReporteService } from './cliente-reporte.service';
import { ReporteDto } from '../reporte/reporte.dto';
import { ReporteEntity } from '../reporte/reporte.entity/reporte.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { IdsDto } from 'src/IdsDto';

@Controller('clientes')
@UseInterceptors(BusinessErrorsInterceptor)
export class ClienteReporteController {

    constructor(
        private readonly clienteReporteService: ClienteReporteService
    ){}

    @UseGuards(JwtAuthGuard)
    @Post(':clienteId/reportes/:reporteId')
    async addReporteCliente(@Param('clienteId') clienteId: string, @Param('reporteId') reporteId: string){
        return await this.clienteReporteService.addReporteCliente(clienteId, reporteId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':clienteId/reportes/:reporteId')
    async getClienteReporte(@Param('clienteId') clienteId: string, @Param('reporteId') reporteId: string){
        return await this.clienteReporteService.getClienteReporte(clienteId, reporteId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':clienteId/reportes')
    async getReportesCliente(@Param('clienteId') clienteId: string){
        return await this.clienteReporteService.getReportesCliente(clienteId);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':clienteId/reportes')
    async associateReportesCliente(@Body() IdsDto: IdsDto, @Param('clienteId') clienteId: string) {
        return await this.clienteReporteService.associateReportesCliente(clienteId, IdsDto.Ids);
    }
    
    
    @UseGuards(JwtAuthGuard)
    @Delete(':clienteId/reportes/:reporteId')
    @HttpCode(204)
    async removeReporteCliente(@Param('clienteId') clienteId: string, @Param('reporteId') reporteId: string){
        return await this.clienteReporteService.removeReporteCliente(clienteId, reporteId);
    }
}
