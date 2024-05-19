import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClienteEntity } from '../cliente/cliente.entity/cliente.entity';
import { Repository } from 'typeorm';
import { TransferenciaEntity } from '../transferencia/transferencia.entity/transferencia.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class ClienteTransferenciaService {


    constructor(

        @InjectRepository(ClienteEntity)
        private readonly clienteRepository: Repository<ClienteEntity>,

        @InjectRepository(TransferenciaEntity)
        private readonly transferenciaRepository: Repository<TransferenciaEntity>,
    ){}


    async addTransferenciaCliente(idCliente: string, transferencia: TransferenciaEntity): Promise<ClienteEntity> {

        if (!/^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/.test(idCliente)) {
            throw new BusinessLogicException("Invalid id format. HINT: Valid UUID values are of the form \'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF\'", BusinessError.BAD_REQUEST);
        }

        const cliente: ClienteEntity = await this.clienteRepository.findOne({ where: { id: idCliente }, relations: ['transferencias'] });
        if (!cliente) {
            throw new BusinessLogicException("The client with the given id was not found", BusinessError.NOT_FOUND);
        }

        // const transferencia: TransferenciaEntity = await this.transferenciaRepository.findOne({ where: { id: idTransferencia } });
        // if (!transferencia) {
        //     throw new BusinessLogicException("The transfer with the given id was not found", BusinessError.NOT_FOUND);
        // }

        const transferenciaPersistida: TransferenciaEntity = await this.transferenciaRepository.save(transferencia);

        cliente.transferencias.push(transferenciaPersistida);

        return await this.clienteRepository.save(cliente);
    }

    async getTransferenciasCliente(idCliente: string): Promise<TransferenciaEntity[]> {

        if (!/^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/.test(idCliente)) {
            throw new BusinessLogicException("Invalid id format. HINT: Valid UUID values are of the form \'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF\'", BusinessError.BAD_REQUEST);
        }

        const cliente: ClienteEntity = await this.clienteRepository.findOne({ where: { id: idCliente }, relations: ['transferencias'] });
        if (!cliente) {
            throw new BusinessLogicException("The client with the given id was not found", BusinessError.NOT_FOUND);
        }

        return cliente.transferencias;
    }

    async getTransferenciaCliente(idCliente: string, idTransferencia: string): Promise<TransferenciaEntity> {

        if (!/^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/.test(idCliente) || !/^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/.test(idTransferencia)) {
            throw new BusinessLogicException("Invalid id format. HINT: Valid UUID values are of the form \'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF\'", BusinessError.BAD_REQUEST);
        }

        const cliente: ClienteEntity = await this.clienteRepository.findOne({ where: { id: idCliente }, relations: ['transferencias'] });
        if (!cliente) {
            throw new BusinessLogicException("The client with the given id was not found", BusinessError.NOT_FOUND);
        }

        const transferencia: TransferenciaEntity = cliente.transferencias.find(t => t.id === idTransferencia);
        if (!transferencia) {
            throw new BusinessLogicException("The transfer with the given id was not found", BusinessError.NOT_FOUND);
        }

        return transferencia;
    }

    
}
