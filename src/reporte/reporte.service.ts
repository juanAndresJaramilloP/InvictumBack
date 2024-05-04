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
        const persistedReporte: ReporteEntity = await this.reporteRepository.findOne({where:{id}});
        if(!persistedReporte) {
            throw new BusinessLogicException("The report with the given id was not found", BusinessError.NOT_FOUND);
        }
        return await this.reporteRepository.save({...persistedReporte, ...reporte});
    }

    async delete(id: string): Promise<void> {
        const persistedReporte: ReporteEntity = await this.reporteRepository.findOne({where:{id}});
        if(!persistedReporte) {
            throw new BusinessLogicException("The report with the given id was not found", BusinessError.NOT_FOUND);
        }
        await this.reporteRepository.remove(persistedReporte);
    }
    
}
