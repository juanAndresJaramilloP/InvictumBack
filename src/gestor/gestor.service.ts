import { Injectable } from '@nestjs/common';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GestorEntity } from './gestor.entity/gestor.entity';

@Injectable()
export class GestorService {

    constructor(
        @InjectRepository(GestorEntity)
        private readonly gestorRepository: Repository<GestorEntity>
    ) {}

    async findAll(): Promise<GestorEntity[]> {
        return await this.gestorRepository.find({relations: ['reportes']});
    }

    async findOne(id: string): Promise<GestorEntity> {

        if (!/^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/.test(id)) {
            throw new BusinessLogicException("Invalid id format. HINT: Valid UUID values are of the form \'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF\'", BusinessError.BAD_REQUEST);
        }

        const gestor: GestorEntity = await this.gestorRepository.findOne({where:{id}, relations: ['reportes']});
        if (!gestor) {
            throw new BusinessLogicException("The manager with the given id was not found", BusinessError.NOT_FOUND);
        }

        return gestor;
    }

    async create(gestor: GestorEntity): Promise<GestorEntity> {
        return await this.gestorRepository.save(gestor);
    }

    async update(id: string, gestor: GestorEntity): Promise<GestorEntity> {

        if (!/^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/.test(id)) {
            throw new BusinessLogicException("Invalid id format. HINT: Valid UUID values are of the form \'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF\'", BusinessError.BAD_REQUEST);
        }

        const persistedGestor: GestorEntity = await this.gestorRepository.findOne({where:{id}});
        if(!persistedGestor) {
            throw new BusinessLogicException("The manager with the given id was not found", BusinessError.NOT_FOUND);
        }

        return await this.gestorRepository.save({...persistedGestor, ...gestor});
    }

    async delete(id: string): Promise<void> {

        if (!/^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/.test(id)) {
            throw new BusinessLogicException("Invalid id format. HINT: Valid UUID values are of the form \'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF\'", BusinessError.BAD_REQUEST);
        }
        
        const persistedGestor: GestorEntity = await this.gestorRepository.findOne({where:{id}});
        if(!persistedGestor) {
            throw new BusinessLogicException("The manager with the given id was not found", BusinessError.NOT_FOUND);
        }

        await this.gestorRepository.remove(persistedGestor);
    }
}
