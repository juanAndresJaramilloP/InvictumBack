import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClienteEntity } from './cliente.entity/cliente.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class ClienteService {

    constructor(
        @InjectRepository(ClienteEntity)
        private readonly clienteRepository: Repository<ClienteEntity>
    ) {}

    async findAll(): Promise<ClienteEntity[]> {
        return await this.clienteRepository.find({ relations: ['transferencias','reportes']});
    }

    async findOne(id: string): Promise<ClienteEntity> {
        const cliente: ClienteEntity = await this.clienteRepository.findOne({where:{id}, relations: ['transferencias','reportes']});
        if (!cliente) {
            throw new BusinessLogicException("The client with the given id was not found", BusinessError.NOT_FOUND);
        }

        return cliente;
    }

    async create(cliente: ClienteEntity): Promise<ClienteEntity> {
        return await this.clienteRepository.save(cliente);
    }

    async update(id: string, cliente: ClienteEntity): Promise<ClienteEntity> {
        const persistedCliente: ClienteEntity = await this.clienteRepository.findOne({where:{id}});
        if(!persistedCliente) {
            throw new BusinessLogicException("The client with the given id was not found", BusinessError.NOT_FOUND);
        }

        return await this.clienteRepository.save({...persistedCliente, ...cliente});
    }

    async delete(id: string): Promise<void> {
        const persistedCliente: ClienteEntity = await this.clienteRepository.findOne({where:{id}});
        if(!persistedCliente) {
            throw new BusinessLogicException("The client with the given id was not found", BusinessError.NOT_FOUND);
        }

        await this.clienteRepository.remove(persistedCliente);
    }

}
