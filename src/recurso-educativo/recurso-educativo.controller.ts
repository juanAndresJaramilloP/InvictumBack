import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { RecursoEducativoService } from './recurso-educativo.service';
import { RecursoEducativoDto } from './recurso-educativo.dto';
import { RecursoEducativoEntity } from './recurso-educativo.entity/recurso-educativo.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';


@Controller('recursos-educativos')
@UseInterceptors(BusinessErrorsInterceptor)
export class RecursoEducativoController {

    constructor(
        private readonly recursoEducativoService: RecursoEducativoService
    ){}

    @Get()
    async findAll() {
      return await this.recursoEducativoService.findAll();
    }

    @Get(':recursoEducativoId')
    async findOne(@Param('recursoEducativoId') recursoEducativoId: string) {
      return await this.recursoEducativoService.findOne(recursoEducativoId);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() recursoEducativoDto: RecursoEducativoDto) {
      const recursoEducativo: RecursoEducativoEntity = plainToInstance(RecursoEducativoEntity, recursoEducativoDto);
      return await this.recursoEducativoService.create(recursoEducativo);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':recursoEducativoId')
    async update(@Param('recursoEducativoId') recursoEducativoId: string, @Body() recursoEducativoDto: RecursoEducativoDto) {
      const recursoEducativo: RecursoEducativoEntity = plainToInstance(RecursoEducativoEntity, recursoEducativoDto);
      return await this.recursoEducativoService.update(recursoEducativoId, recursoEducativo);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':recursoEducativoId')
    @HttpCode(204)
    async delete(@Param('recursoEducativoId') recursoEducativoId: string) {
      return await this.recursoEducativoService.delete(recursoEducativoId);
    }
}
