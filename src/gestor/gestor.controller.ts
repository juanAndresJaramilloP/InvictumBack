import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { GestorService } from './gestor.service';
import { GestorDto } from './gestor.dto';
import { GestorEntity } from './gestor.entity/gestor.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('gestores')
@UseInterceptors(BusinessErrorsInterceptor)
export class GestorController {

    constructor(
        private readonly gestorService: GestorService
    ){}

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
      return await this.gestorService.findAll();
    }
  
    @UseGuards(JwtAuthGuard)
    @Get(':gestorId')
    async findOne(@Param('gestorId') gestorId: string) {
      return await this.gestorService.findOne(gestorId);
    }
  
    
    @Post()
    async create(@Body() gestorDto: GestorDto) {
      const gestor: GestorEntity = plainToInstance(GestorEntity, gestorDto);
      return await this.gestorService.create(gestor);
    }
  
    @UseGuards(JwtAuthGuard)
    @Put(':gestorId')
    async update(@Param('gestorId') gestorId: string, @Body() gestorDto: GestorDto) {
      const gestor: GestorEntity = plainToInstance(GestorEntity, gestorDto);
      return await this.gestorService.update(gestorId, gestor);
    }
  
    @UseGuards(JwtAuthGuard)
    @Delete(':gestorId')
    @HttpCode(204)
    async delete(@Param('gestorId') gestorId: string) {
      return await this.gestorService.delete(gestorId);
    }
}
