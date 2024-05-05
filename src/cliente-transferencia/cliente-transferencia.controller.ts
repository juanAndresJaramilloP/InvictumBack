import { Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { ClienteTransferenciaService } from './cliente-transferencia.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';

@Controller('clientes')
@UseInterceptors(BusinessErrorsInterceptor)
export class ClienteTransferenciaController {

    constructor(
        private readonly clienteTransferenciaService: ClienteTransferenciaService
    ){}

    @Post(':clienteId/transferencias/:transferenciaId')
    async addTransferenciaCliente(@Param('clienteId') clienteId: string, @Param('transferenciaId') transferenciaId: string){
        return await this.clienteTransferenciaService.addTransferenciaCliente(clienteId, transferenciaId);
    }

    @Get(':clienteId/transferencias/:transferenciaId')
    async getTransferenciaCliente(@Param('clienteId') clienteId: string, @Param('transferenciaId') transferenciaId: string){
        return await this.clienteTransferenciaService.getTransferenciaCliente(clienteId, transferenciaId);
    }

    @Get(':clienteId/transferencias')
    async getTransferenciasCliente(@Param('clienteId') clienteId: string){
        return await this.clienteTransferenciaService.getTransferenciasCliente(clienteId);
    }
}
