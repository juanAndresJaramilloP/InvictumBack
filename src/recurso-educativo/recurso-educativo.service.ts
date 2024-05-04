import { Injectable } from '@nestjs/common';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecursoEducativoEntity } from './recurso-educativo.entity/recurso-educativo.entity';

@Injectable()
export class RecursoEducativoService {

    constructor(
        @InjectRepository(RecursoEducativoEntity)
        private readonly recursoEducativoRepository: Repository<RecursoEducativoEntity>
    ){}

    async findAll(): Promise<RecursoEducativoEntity[]> {
        return await this.recursoEducativoRepository.find({relations: ['tema']});
    }

    async findOne(id: string): Promise<RecursoEducativoEntity> {
        const recursoEducativo: RecursoEducativoEntity = await this.recursoEducativoRepository.findOne({where:{id}, relations: ['tema']});
        if (!recursoEducativo) {
            throw new BusinessLogicException("The educational resource with the given id was not found", BusinessError.NOT_FOUND);
        }

        return recursoEducativo;
    }

    async create(recursoEducativo: RecursoEducativoEntity): Promise<RecursoEducativoEntity> {
        return await this.recursoEducativoRepository.save(recursoEducativo);
    }

    async update(id: string, recursoEducativo: RecursoEducativoEntity): Promise<RecursoEducativoEntity> {
        const persistedRecursoEducativo: RecursoEducativoEntity = await this.recursoEducativoRepository.findOne({where:{id}});
        if(!persistedRecursoEducativo) {
            throw new BusinessLogicException("The educational resource with the given id was not found", BusinessError.NOT_FOUND);
        }

        return await this.recursoEducativoRepository.save({...persistedRecursoEducativo, ...recursoEducativo});
    }

    async delete(id: string): Promise<void> {
        const persistedRecursoEducativo: RecursoEducativoEntity = await this.recursoEducativoRepository.findOne({where:{id}});
        if(!persistedRecursoEducativo) {
            throw new BusinessLogicException("The educational resource with the given id was not found", BusinessError.NOT_FOUND);
        }

        await this.recursoEducativoRepository.remove(persistedRecursoEducativo);
    }
    
}
