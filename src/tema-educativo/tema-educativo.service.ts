import { Injectable } from '@nestjs/common';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TemaEducativoEntity } from './tema-educativo.entity/tema-educativo.entity';

@Injectable()
export class TemaEducativoService {

    constructor(
        @InjectRepository(TemaEducativoEntity)
        private readonly temaEducativoRepository: Repository<TemaEducativoEntity>
    ){}

    async findAll(): Promise<TemaEducativoEntity[]> {
        return await this.temaEducativoRepository.find({relations: ['recursos']});
    }

    async findOne(id: string): Promise<TemaEducativoEntity> {
        const temaEducativo: TemaEducativoEntity = await this.temaEducativoRepository.findOne({where:{id}, relations: ['recursos']});
        if (!temaEducativo) {
            throw new BusinessLogicException("The educational theme with the given id was not found", BusinessError.NOT_FOUND);
        }

        return temaEducativo;
    }

    async create(temaEducativo: TemaEducativoEntity): Promise<TemaEducativoEntity> {
        return await this.temaEducativoRepository.save(temaEducativo);
    }

    async update(id: string, temaEducativo: TemaEducativoEntity): Promise<TemaEducativoEntity> {
        const persistedTemaEducativo: TemaEducativoEntity = await this.temaEducativoRepository.findOne({where:{id}});
        if(!persistedTemaEducativo) {
            throw new BusinessLogicException("The educational theme with the given id was not found", BusinessError.NOT_FOUND);
        }

        return await this.temaEducativoRepository.save({...persistedTemaEducativo, ...temaEducativo});
    }

    async delete(id: string): Promise<void> {
        const persistedTemaEducativo: TemaEducativoEntity = await this.temaEducativoRepository.findOne({where:{id}});
        if(!persistedTemaEducativo) {
            throw new BusinessLogicException("The educational theme with the given id was not found", BusinessError.NOT_FOUND);
        }

        await this.temaEducativoRepository.remove(persistedTemaEducativo);
    }
}
