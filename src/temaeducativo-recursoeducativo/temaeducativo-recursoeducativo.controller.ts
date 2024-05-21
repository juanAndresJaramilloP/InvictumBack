import { TemaeducativoRecursoeducativoService } from './temaeducativo-recursoeducativo.service';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { RecursoEducativoEntity } from 'src/recurso-educativo/recurso-educativo.entity/recurso-educativo.entity';
import { RecursoEducativoDto } from 'src/recurso-educativo/recurso-educativo.dto';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { RecursoEducativoIdsDto } from './RecursoEducativoIds.dto'; 

@Controller('temas-educativos')
@UseInterceptors(BusinessErrorsInterceptor)
export class RecursoTemaController {
    constructor(private readonly temaEducativoRecursoEducativoService: TemaeducativoRecursoeducativoService){}

    @UseGuards(JwtAuthGuard)
    @Post(':temaEducativoId/recursos-educativos/:recursoEducativoId')
    async addRecursoTema(@Param('temaEducativoId') temaEducativoId: string, @Param('recursoEducativoId') recursoEducativoId: string){
        return await this.temaEducativoRecursoEducativoService.addRecursoEducativoTema(temaEducativoId, recursoEducativoId);
    }

    @Get(':temaEducativoId/recursos-educativos/:recursoEducativoId')
    async findRecursoByTemaIdAndRecursoId(@Param('temaEducativoId') temaEducativoId: string, @Param('recursoEducativoId') recursoEducativoId: string){
        return await this.temaEducativoRecursoEducativoService.getTemaRecurso(temaEducativoId, recursoEducativoId);
    }

    @Get(':temaEducativoId/recursos-educativos')
    async findRecursosByTemaId(@Param('temaEducativoId') temaEducativoId: string){
        return await this.temaEducativoRecursoEducativoService. getRecursosTema(temaEducativoId);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':temaEducativoId/recursos-educativos')
    async associateRecursoTema( @Body() recursoEducativoIdsDto: RecursoEducativoIdsDto, @Param('temaEducativoId') temaEducativoId: string ){
        return await this.temaEducativoRecursoEducativoService.associateRecursosTema(temaEducativoId, recursoEducativoIdsDto.recursosIds);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':temaEducativoId/recursos-educativos/:recursoEducativoId')
    @HttpCode(204)
    async deleteRecursoTema(@Param('temaEducativoId') temaEducativoId: string, @Param('recursoEducativoId') recursoEducativoId: string){
        return await this.temaEducativoRecursoEducativoService.removeRecursoEducativoTema(temaEducativoId, recursoEducativoId);
    }
}
