
import { TemaEducativoService } from 'src/tema-educativo/tema-educativo.service';
import { RecursoEducativoService } from './recurso-educativo.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { RecursoEducativoDto } from './recurso-educativo.dto';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { RecursoEducativoEntity } from './recurso-educativo.entity/recurso-educativo.entity';
import { plainToInstance } from 'class-transformer';

@Controller('recurso-educativo')
@UseInterceptors(BusinessErrorsInterceptor)
export class RecursoEducativoController {
    constructor(private readonly recursoEducativoService: RecursoEducativoService) { }
    @Get()
    async findAll() {
    return await this.recursoEducativoService.findAll();
    }

    @Get(':recursoId')
    async findOne(@Param('recursoId') recursoId: string) {
        return await this.recursoEducativoService.findOne(recursoId);
    }

    @Post()
    async create(@Body() recursoDto: RecursoEducativoDto) {
    const recurso: RecursoEducativoEntity = plainToInstance(RecursoEducativoEntity, recursoDto);
    return await this.recursoEducativoService.create(recurso);
    }

    
    @Put(':recursoId')
    async update(@Param('recursoId') recursoId: string, @Body() recursoDto: RecursoEducativoDto) {
        const recurso: RecursoEducativoEntity = plainToInstance(RecursoEducativoEntity, recursoDto);
        return await this.recursoEducativoService.update(recursoId, recurso);
    }

    @Delete(':recursoId')
    @HttpCode(204)
    async delete(@Param('recursoId') recursoId: string) {
        return await this.recursoEducativoService.delete(recursoId);
    }

}
