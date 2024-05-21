import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { GestorReporteService } from './gestor-reporte.service';
import { ReporteDto } from '../reporte/reporte.dto';
import { ReporteEntity } from '../reporte/reporte.entity/reporte.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { IdsDto } from 'src/IdsDto';

@Controller('gestores')
@UseInterceptors(BusinessErrorsInterceptor)
export class GestorReporteController {

    constructor(
        private readonly gestorReporteService: GestorReporteService
    ){}

    @UseGuards(JwtAuthGuard)
    @Post(':gestorId/reportes/:reporteId')
    async addReporteGestor(@Param('gestorId') gestorId: string, @Param('reporteId') reporteId: string){
        return await this.gestorReporteService.addReporteGestor(gestorId, reporteId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':gestorId/reportes/:reporteId')
    async getGestorReporte(@Param('gestorId') gestorId: string, @Param('reporteId') reporteId: string){
        return await this.gestorReporteService.getGestorReporte(gestorId, reporteId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':gestorId/reportes')
    async getReportesGestor(@Param('gestorId') gestorId: string){
        return await this.gestorReporteService.getReportesGestor(gestorId);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':gestorId/reportes')
    async associateReportesGestor( @Body() IdsDto: IdsDto, @Param('gestorId') gestorId: string ) {
        return await this.gestorReporteService.associateReportesGestor(gestorId, IdsDto.Ids);
    }
    
    @UseGuards(JwtAuthGuard)
    @Delete(':gestorId/reportes/:reporteId')
    @HttpCode(204)
    async removeReporteGestor(@Param('gestorId') gestorId: string, @Param('reporteId') reporteId: string){
        return await this.gestorReporteService.removeReporteGestor(gestorId, reporteId);
    }

}
