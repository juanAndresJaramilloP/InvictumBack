import { Controller, Get, Param, Post, UseInterceptors, Body } from '@nestjs/common';
import { ClienteTransferenciaService } from './cliente-transferencia.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { TransferenciaDto } from '../transferencia/transferencia.dto';
import { TransferenciaEntity } from '../transferencia/transferencia.entity/transferencia.entity';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('clientes')
@UseInterceptors(BusinessErrorsInterceptor)
export class ClienteTransferenciaController {

    constructor(
        private readonly clienteTransferenciaService: ClienteTransferenciaService
    ){}

    @UseGuards(JwtAuthGuard)
    @Post(':clienteId/transferencias')
    async addTransferenciaCliente(@Param('clienteId') clienteId: string, @Body() transferenciaDTO: TransferenciaDto){
        const transferencia: TransferenciaEntity = plainToInstance(TransferenciaEntity, transferenciaDTO);
        return await this.clienteTransferenciaService.addTransferenciaCliente(clienteId, transferencia);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':clienteId/transferencias/:transferenciaId')
    async getTransferenciaCliente(@Param('clienteId') clienteId: string, @Param('transferenciaId') transferenciaId: string){
        return await this.clienteTransferenciaService.getTransferenciaCliente(clienteId, transferenciaId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':clienteId/transferencias')
    async getTransferenciasCliente(@Param('clienteId') clienteId: string){
        return await this.clienteTransferenciaService.getTransferenciasCliente(clienteId);
    }
}
