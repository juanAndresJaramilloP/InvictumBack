import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TemaEducativoEntity } from '../tema-educativo/tema-educativo.entity/tema-educativo.entity';
import { RecursoEducativoEntity } from '../recurso-educativo/recurso-educativo.entity/recurso-educativo.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class TemaeducativoRecursoeducativoService {

    constructor(

        @InjectRepository(TemaEducativoEntity)
        private readonly temaEducativoRepository: Repository<TemaEducativoEntity>,

        @InjectRepository(RecursoEducativoEntity)
        private readonly recursoEducativoRepository: Repository<RecursoEducativoEntity>,
    ){}


    async addRecursoEducativoTema(idTema: string, idRecurso: string): Promise<TemaEducativoEntity> {

        const tema: TemaEducativoEntity = await this.temaEducativoRepository.findOne({ where: { id: idTema }, relations: ['recursos'] });
        if (!tema) {
            throw new BusinessLogicException("The category with the given id was not found", BusinessError.NOT_FOUND);
        }

        const recurso: RecursoEducativoEntity = await this.recursoEducativoRepository.findOne({ where: { id: idRecurso } });
        if (!recurso) {
            throw new BusinessLogicException("The educational resource with the given id was not found", BusinessError.NOT_FOUND);
        }

        tema.recursos.push(recurso);

        return await this.temaEducativoRepository.save(tema);
    }

    async removeRecursoEducativoTema(idTema: string, idRecurso: string): Promise<TemaEducativoEntity> {

        const tema: TemaEducativoEntity = await this.temaEducativoRepository.findOne({ where: { id: idTema }, relations: ['recursos'] });
        if (!tema) {
            throw new BusinessLogicException("The category with the given id was not found", BusinessError.NOT_FOUND);
        }

        const recurso: RecursoEducativoEntity = await this.recursoEducativoRepository.findOne({ where: { id: idRecurso } });
        if (!recurso) {
            throw new BusinessLogicException("The educational resource with the given id was not found", BusinessError.NOT_FOUND);
        }

        tema.recursos = tema.recursos.filter(r => r.id !== recurso.id);

        return await this.temaEducativoRepository.save(tema);
    }

    async getRecursosTema(idTema: string): Promise<RecursoEducativoEntity[]> {

        const tema: TemaEducativoEntity = await this.temaEducativoRepository.findOne({ where: { id: idTema }, relations: ['recursos'] });
        if (!tema) {
            throw new BusinessLogicException("The category with the given id was not found", BusinessError.NOT_FOUND);
        }

        return tema.recursos;
    }

    async getTemaRecurso(idTema: string, idRecurso: string): Promise<RecursoEducativoEntity> {

        const tema: TemaEducativoEntity = await this.temaEducativoRepository.findOne({ where: { id: idTema }, relations: ['recursos'] });
        if (!tema) {
            throw new BusinessLogicException("The category with the given id was not found", BusinessError.NOT_FOUND);
        }

        const recurso: RecursoEducativoEntity = tema.recursos.find(r => r.id === idRecurso);
        if (!recurso) {
            throw new BusinessLogicException("The educational resource with the given id was not found", BusinessError.NOT_FOUND);
        }

        return recurso;
    }

    async associateRecursosTema(idTema: string, recursos: RecursoEducativoEntity[]): Promise<TemaEducativoEntity> {

        const tema: TemaEducativoEntity = await this.temaEducativoRepository.findOne({ where: { id: idTema }, relations: ['recursos'] });
        if (!tema) {
            throw new BusinessLogicException("The category with the given id was not found", BusinessError.NOT_FOUND);
        }

        for (let i = 0; i < recursos.length; i++) {
            const recurso: RecursoEducativoEntity = await this.recursoEducativoRepository.findOne({ where: { id: recursos[i].id } });
            if (!recurso)
                throw new BusinessLogicException("The educational resource with the given id was not found", BusinessError.NOT_FOUND)
        }

        tema.recursos = recursos;
        return await this.temaEducativoRepository.save(tema);
    }
}
