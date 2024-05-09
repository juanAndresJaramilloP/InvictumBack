import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { TemaeducativoRecursoeducativoService } from './temaEducativo-recursoEducativo.service';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { RecursoEducativoEntity } from 'src/recurso-educativo/recurso-educativo.entity/recurso-educativo.entity';
import { RecursoEducativoDto } from 'src/recurso-educativo/recurso-educativo.dto';

@Controller('tema-educativo')
export class RecursoTemaController {
    constructor(private readonly temaEducativoRecursoEducativoService: TemaeducativoRecursoeducativoService){}

    @Post(':temaEducativoId/recursoEducativo/:recursoEducativoId')
    async addRecursoTema(@Param('temaEducativoId') temaEducativoId: string, @Param('recursoEducativoId') recursoEducativoId: string){
        return await this.temaEducativoRecursoEducativoService.addRecursoEducativoTema(temaEducativoId, recursoEducativoId);
    }

    @Get(':temaEducativoId/recursoEducativos/:recursoEducativoId')
    async findRecursoByTemaIdAndRecursoId(@Param('temaEducativoId') temaEducativoId: string, @Param('recursoEducativoId') recursoEducativoId: string){
        return await this.temaEducativoRecursoEducativoService.getTemaRecurso(temaEducativoId, recursoEducativoId);
    }

    @Get(':temaEducativoId/recursosEducativos')
    async findRecursosByTemaId(@Param('temaEducativoId') temaEducativoId: string){
        return await this.temaEducativoRecursoEducativoService. getRecursosTema(temaEducativoId);
    }

    @Put(':temaEducativoId/recursosEducativos')
    async associateRecursoTema(@Body() recursoEducativoDto: RecursoEducativoDto[], @Param('temaEducativoId') temaEducativoId: string){
        const recursosEducativos = plainToInstance(RecursoEducativoEntity, recursoEducativoDto)
        return await this.temaEducativoRecursoEducativoService.associateRecursosTema(temaEducativoId, recursosEducativos);
    }

    @Delete(':temaEducativoId/recursosEducativos/:recursoEducativoId')
    @HttpCode(204)
    async deleteRecursoTema(@Param('temaEducativoId') temaEducativoId: string, @Param('recursoEducativoId') recursoEducativoId: string){
        return await this.temaEducativoRecursoEducativoService.removeRecursoEducativoTema(temaEducativoId, recursoEducativoId);
    }
}
