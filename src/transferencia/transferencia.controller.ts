import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { TransferenciaDto } from './transferencia.dto';
import { TransferenciaEntity } from './transferencia.entity/transferencia.entity';
import { TransferenciaService } from './transferencia.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('transferencias')
@UseInterceptors(BusinessErrorsInterceptor)
export class TransferenciaController {

    constructor(
        private readonly transferenciaService: TransferenciaService
    ){}

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
      return await this.transferenciaService.findAll();
    }

    @Get(':transferenciaId')
    async findOne(@Param('transferenciaId') transferenciaId: string) {
      return await this.transferenciaService.findOne(transferenciaId);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() transferenciaDto: TransferenciaDto) {
      const transferencia: TransferenciaEntity = plainToInstance(TransferenciaEntity, transferenciaDto);
      return await this.transferenciaService.create(transferencia);
    }


}
