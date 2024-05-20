import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteDto } from './cliente.dto';
import { ClienteEntity } from './cliente.entity/cliente.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';


@Controller('clientes')
@UseInterceptors(BusinessErrorsInterceptor)
export class ClienteController {

    constructor(
        private readonly clienteService: ClienteService,
    ){}

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
      return await this.clienteService.findAll();
    }
  
    @UseGuards(JwtAuthGuard)
    @Get(':clientId')
    async findOne(@Param('clientId') clientId: string) {
      return await this.clienteService.findOne(clientId);
    }
  
    @Post()
    async create(@Body() clienteDto: ClienteDto) {
      const client: ClienteEntity = plainToInstance(ClienteEntity, clienteDto);
      return await this.clienteService.create(client);
    }
  
    @UseGuards(JwtAuthGuard)
    @Put(':clientId')
    async update(@Param('clientId') clientId: string, @Body() clienteDto: ClienteDto) {
      const client: ClienteEntity = plainToInstance(ClienteEntity, clienteDto);
      return await this.clienteService.update(clientId, client);
    }
  
    @UseGuards(JwtAuthGuard)
    @Delete(':clientId')
    @HttpCode(204)
    async delete(@Param('clientId') clientId: string) {
      return await this.clienteService.delete(clientId);
    }

}
