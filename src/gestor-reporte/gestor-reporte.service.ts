import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GestorEntity } from '../gestor/gestor.entity/gestor.entity';
import { Repository } from 'typeorm';
import { ReporteEntity } from '../reporte/reporte.entity/reporte.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class GestorReporteService {

    constructor(

        @InjectRepository(GestorEntity)
        private readonly gestorRepository: Repository<GestorEntity>,

        @InjectRepository(ReporteEntity)
        private readonly reporteRepository: Repository<ReporteEntity>,
    ){}

    async addReporteGestor(idGestor: string, idReporte: string): Promise<GestorEntity> {

        const gestor: GestorEntity = await this.gestorRepository.findOne({ where: { id: idGestor }, relations: ['reportes'] });
        if (!gestor) {
            throw new BusinessLogicException("The manager with the given id was not found", BusinessError.NOT_FOUND);
        }

        const reporte: ReporteEntity = await this.reporteRepository.findOne({ where: { id: idReporte } });
        if (!reporte) {
            throw new BusinessLogicException("The report with the given id was not found", BusinessError.NOT_FOUND);
        }

        gestor.reportes.push(reporte);

        return await this.gestorRepository.save(gestor);
    }

    async removeReporteGestor(idGestor: string, idReporte: string): Promise<GestorEntity> {

        const gestor: GestorEntity = await this.gestorRepository.findOne({ where: { id: idGestor }, relations: ['reportes'] });
        if (!gestor) {
            throw new BusinessLogicException("The manager with the given id was not found", BusinessError.NOT_FOUND);
        }

        const reporte: ReporteEntity = await this.reporteRepository.findOne({ where: { id: idReporte } });
        if (!reporte) {
            throw new BusinessLogicException("The report with the given id was not found", BusinessError.NOT_FOUND);
        }

        gestor.reportes = gestor.reportes.filter(r => r.id !== reporte.id);

        return await this.gestorRepository.save(gestor);
    }

    async getReportesGestor(idGestor: string): Promise<ReporteEntity[]> {

        const gestor: GestorEntity = await this.gestorRepository.findOne({ where: { id: idGestor }, relations: ['reportes'] });
        if (!gestor) {
            throw new BusinessLogicException("The manager with the given id was not found", BusinessError.NOT_FOUND);
        }

        return gestor.reportes;
    }

    async getGestorReporte(idGestor: string, idReporte: string): Promise<ReporteEntity> {

        const gestor: GestorEntity = await this.gestorRepository.findOne({ where: { id: idGestor }, relations: ['reportes'] });
        if (!gestor) {
            throw new BusinessLogicException("The manager with the given id was not found", BusinessError.NOT_FOUND);
        }

        const reporte: ReporteEntity = gestor.reportes.find(r => r.id === idReporte);
        if (!reporte) {
            throw new BusinessLogicException("The report with the given id was not found", BusinessError.NOT_FOUND);
        }

        return reporte;
    }

    async associateReportesGestor(idGestor: string, reportes: ReporteEntity[]): Promise<GestorEntity> {

        const gestor: GestorEntity = await this.gestorRepository.findOne({ where: { id: idGestor }, relations: ['reportes'] });
        if (!gestor) {
            throw new BusinessLogicException("The manager with the given id was not found", BusinessError.NOT_FOUND);
        }

        for (let i = 0; i < reportes.length; i++) {
            const reporte: ReporteEntity = await this.reporteRepository.findOne({ where: { id: reportes[i].id } });
            if (!reporte)
                throw new BusinessLogicException("The report with the given id was not found", BusinessError.NOT_FOUND)
        }

        gestor.reportes = reportes;
        return await this.gestorRepository.save(gestor);
    }
    
}
