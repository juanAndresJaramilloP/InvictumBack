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

        if (!/^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/.test(idTema) || !/^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/.test(idRecurso)) {
            throw new BusinessLogicException("Invalid id format. HINT: Valid UUID values are of the form \'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF\'", BusinessError.BAD_REQUEST);
        }

        const tema: TemaEducativoEntity = await this.temaEducativoRepository.findOne({ where: { id: idTema }, relations: ['recursos'] });
        if (!tema) {
            throw new BusinessLogicException("The educational theme with the given id was not found", BusinessError.NOT_FOUND);
        }

        const recurso: RecursoEducativoEntity = await this.recursoEducativoRepository.findOne({ where: { id: idRecurso } });
        if (!recurso) {
            throw new BusinessLogicException("The educational resource with the given id was not found", BusinessError.NOT_FOUND);
        }

        tema.recursos.push(recurso);

        return await this.temaEducativoRepository.save(tema);
    }
    async getTemaRecurso(idTema: string, idRecurso: string): Promise<RecursoEducativoEntity> {

        if (!/^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/.test(idTema) || !/^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/.test(idRecurso)) {
            throw new BusinessLogicException("Invalid id format. HINT: Valid UUID values are of the form \'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF\'", BusinessError.BAD_REQUEST);
        }

        const tema: TemaEducativoEntity = await this.temaEducativoRepository.findOne({ where: { id: idTema }, relations: ['recursos'] });
        if (!tema) {
            throw new BusinessLogicException("The educational theme with the given id was not found", BusinessError.NOT_FOUND);
        }

        const recurso: RecursoEducativoEntity = tema.recursos.find(r => r.id === idRecurso);
        if (!recurso) {
            throw new BusinessLogicException("The educational resource with the given id was not found", BusinessError.NOT_FOUND);
        }

        return recurso;
    }

    
    async getRecursosTema(idTema: string): Promise<RecursoEducativoEntity[]> {

        if (!/^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/.test(idTema)) {
            throw new BusinessLogicException("Invalid id format. HINT: Valid UUID values are of the form \'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF\'", BusinessError.BAD_REQUEST);
        }

        const tema: TemaEducativoEntity = await this.temaEducativoRepository.findOne({ where: { id: idTema }, relations: ['recursos'] });
        if (!tema) {
            throw new BusinessLogicException("The educational theme with the given id was not found", BusinessError.NOT_FOUND);
        }

        return tema.recursos;
    }

  

    async associateRecursosTema(idTema: string, recursosIds: string[]): Promise<TemaEducativoEntity> {

        if (!/^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/.test(idTema)) {
            throw new BusinessLogicException("Invalid id format. HINT: Valid UUID values are of the form 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF'", BusinessError.BAD_REQUEST);
        }
    
        const tema: TemaEducativoEntity = await this.temaEducativoRepository.findOne({ where: { id: idTema }, relations: ['recursos'] });
        if (!tema) {
            throw new BusinessLogicException("The educational theme with the given id was not found", BusinessError.NOT_FOUND);
        }
    
        const recursos: RecursoEducativoEntity[] = [];
        for (let i = 0; i < recursosIds.length; i++) {
            const recurso: RecursoEducativoEntity = await this.recursoEducativoRepository.findOne({ where: { id: recursosIds[i] } });
            
            if (!recurso) {
                throw new BusinessLogicException("The educational resource with the given id was not found", BusinessError.NOT_FOUND);
            }
            
            recursos.push(recurso);
        }
    
        tema.recursos = recursos;
        return await this.temaEducativoRepository.save(tema);
    }
    


    async removeRecursoEducativoTema(idTema: string, idRecurso: string): Promise<TemaEducativoEntity> {

        if (!/^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/.test(idTema) || !/^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/.test(idRecurso)) {
            throw new BusinessLogicException("Invalid id format. HINT: Valid UUID values are of the form \'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF\'", BusinessError.BAD_REQUEST);
        }

        const tema: TemaEducativoEntity = await this.temaEducativoRepository.findOne({ where: { id: idTema }, relations: ['recursos'] });
        if (!tema) {
            throw new BusinessLogicException("The educational theme with the given id was not found", BusinessError.NOT_FOUND);
        }

        const recurso: RecursoEducativoEntity = await this.recursoEducativoRepository.findOne({ where: { id: idRecurso } });
        if (!recurso) {
            throw new BusinessLogicException("The educational resource with the given id was not found", BusinessError.NOT_FOUND);
        }

        tema.recursos = tema.recursos.filter(r => r.id !== recurso.id);

        return await this.temaEducativoRepository.save(tema);
    }

}
