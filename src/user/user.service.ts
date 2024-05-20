import { Injectable } from '@nestjs/common';
import { ClienteEntity } from '../cliente/cliente.entity/cliente.entity';
import { GestorEntity } from '../gestor/gestor.entity/gestor.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class UserService {

    constructor(

        @InjectRepository(ClienteEntity)
        private readonly clienteRepository: Repository<ClienteEntity>,

        @InjectRepository(GestorEntity)
        private readonly gestorRepository: Repository<GestorEntity>,
    ) { }

    async findOne(username: string): Promise<ClienteEntity | GestorEntity | undefined> {
        
        const gestor: GestorEntity = await this.gestorRepository.findOne({ where:{correo : username} });
        if (gestor) {
            return gestor;
        } else {
            const cliente: ClienteEntity = await this.clienteRepository.findOne({ where: {correo : username} });
            return cliente;
        }
    }
}
