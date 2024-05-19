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

        if (!/^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/.test(id)) {
            throw new BusinessLogicException("Invalid id format. HINT: Valid UUID values are of the form \'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF\'", BusinessError.BAD_REQUEST);
        }

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

        if (!/^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/.test(id)) {
            throw new BusinessLogicException("Invalid id format. HINT: Valid UUID values are of the form \'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF\'", BusinessError.BAD_REQUEST);
        }

        const persistedCliente: ClienteEntity = await this.clienteRepository.findOne({where:{id}});
        if(!persistedCliente) {
            throw new BusinessLogicException("The client with the given id was not found", BusinessError.NOT_FOUND);
        }

        return await this.clienteRepository.save({...persistedCliente, ...cliente});
    }

    async delete(id: string): Promise<void> {

        if (!/^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/.test(id)) {
            throw new BusinessLogicException("Invalid id format. HINT: Valid UUID values are of the form \'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF\'", BusinessError.BAD_REQUEST);
        }

        const persistedCliente: ClienteEntity = await this.clienteRepository.findOne({where:{id}});
        if(!persistedCliente) {
            throw new BusinessLogicException("The client with the given id was not found", BusinessError.NOT_FOUND);
        }

        await this.clienteRepository.remove(persistedCliente);
    }

}
