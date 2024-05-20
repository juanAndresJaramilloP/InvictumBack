import { TemaEducativoService } from './tema-educativo.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { TemaEducativoDto } from './tema-educativo.dto';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { TemaEducativoEntity } from './tema-educativo.entity/tema-educativo.entity';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('temas-educativos')
@UseInterceptors(BusinessErrorsInterceptor)
export class TemaEducativoController {

    constructor(
        private readonly temaEducativoService: TemaEducativoService
    ){ }

    @Get()
    async findAll() {
    return await this.temaEducativoService.findAll();
    }

    @Get(':temaId')
    async findOne(@Param('temaId') temaId: string) {
        return await this.temaEducativoService.findOne(temaId);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() temaDto: TemaEducativoDto) {
    const tema: TemaEducativoEntity = plainToInstance(TemaEducativoEntity, temaDto);
    return await this.temaEducativoService.create(tema);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':temaId')
    async update(@Param('temaId') temaId: string, @Body() temaDto: TemaEducativoDto) {
        const tema: TemaEducativoEntity = plainToInstance(TemaEducativoEntity, temaDto);
        return await this.temaEducativoService.update(temaId, tema);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':temaId')
    @HttpCode(204)
    async delete(@Param('temaId') temaId: string) {
        return await this.temaEducativoService.delete(temaId);
    }

}
