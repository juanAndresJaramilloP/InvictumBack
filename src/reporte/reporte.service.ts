import { Injectable } from '@nestjs/common';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { InjectRepository } from '@nestjs/typeorm';
import { ReporteEntity } from './reporte.entity/reporte.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReporteService {

    constructor(
        @InjectRepository(ReporteEntity)
        private readonly reporteRepository: Repository<ReporteEntity>
    ){}

    async findAll(): Promise<ReporteEntity[]> {
        return await this.reporteRepository.find();
    }

    async findOne(id: string): Promise<ReporteEntity> {
        
        if (!/^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/.test(id)) {
            throw new BusinessLogicException("Invalid id format. HINT: Valid UUID values are of the form \'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF\'", BusinessError.BAD_REQUEST);
        }

        const reporte: ReporteEntity = await this.reporteRepository.findOne({where:{id}});
        if (!reporte) {
            throw new BusinessLogicException("The report with the given id was not found", BusinessError.NOT_FOUND);
        }
        return reporte;
    }

    async create(reporte: ReporteEntity): Promise<ReporteEntity> {
        return await this.reporteRepository.save(reporte);
    }

    async update(id: string, reporte: ReporteEntity): Promise<ReporteEntity> {

        if (!/^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/.test(id)) {
            throw new BusinessLogicException("Invalid id format. HINT: Valid UUID values are of the form \'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF\'", BusinessError.BAD_REQUEST);
        }

        const persistedReporte: ReporteEntity = await this.reporteRepository.findOne({where:{id}});
        if(!persistedReporte) {
            throw new BusinessLogicException("The report with the given id was not found", BusinessError.NOT_FOUND);
        }
        return await this.reporteRepository.save({...persistedReporte, ...reporte});
    }

    async delete(id: string): Promise<void> {

        if (!/^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/.test(id)) {
            throw new BusinessLogicException("Invalid id format. HINT: Valid UUID values are of the form \'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF\'", BusinessError.BAD_REQUEST);
        }
        
        const persistedReporte: ReporteEntity = await this.reporteRepository.findOne({where:{id}});
        if(!persistedReporte) {
            throw new BusinessLogicException("The report with the given id was not found", BusinessError.NOT_FOUND);
        }
        await this.reporteRepository.remove(persistedReporte);
    }
    
}
