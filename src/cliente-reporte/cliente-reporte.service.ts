import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClienteEntity } from '../cliente/cliente.entity/cliente.entity';
import { Repository } from 'typeorm';
import { ReporteEntity } from '../reporte/reporte.entity/reporte.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class ClienteReporteService {

    constructor(

        @InjectRepository(ClienteEntity)
        private readonly clienteRepository: Repository<ClienteEntity>,

        @InjectRepository(ReporteEntity)
        private readonly reporteRepository: Repository<ReporteEntity>,
    ) { }


    async addReporteCliente(idCliente: string, idReporte: string): Promise<ClienteEntity> {

        const cliente: ClienteEntity = await this.clienteRepository.findOne({ where: { id: idCliente }, relations: ['reportes'] });
        if (!cliente) {
            throw new BusinessLogicException("The client with the given id was not found", BusinessError.NOT_FOUND);
        }

        const reporte: ReporteEntity = await this.reporteRepository.findOne({ where: { id: idReporte } });
        if (!reporte) {
            throw new BusinessLogicException("The report with the given id was not found", BusinessError.NOT_FOUND);
        }

        cliente.reportes.push(reporte);

        return await this.clienteRepository.save(cliente);
    }

    async removeReporteCliente(idCliente: string, idReporte: string): Promise<ClienteEntity> {

        const cliente: ClienteEntity = await this.clienteRepository.findOne({ where: { id: idCliente }, relations: ['reportes'] });
        if (!cliente) {
            throw new BusinessLogicException("The client with the given id was not found", BusinessError.NOT_FOUND);
        }

        const reporte: ReporteEntity = await this.reporteRepository.findOne({ where: { id: idReporte } });
        if (!reporte) {
            throw new BusinessLogicException("The report with the given id was not found", BusinessError.NOT_FOUND);
        }

        cliente.reportes = cliente.reportes.filter(r => r.id !== reporte.id);

        return await this.clienteRepository.save(cliente);
    }

    async getReportesCliente(idCliente: string): Promise<ReporteEntity[]> {

        const cliente: ClienteEntity = await this.clienteRepository.findOne({ where: { id: idCliente }, relations: ['reportes'] });
        if (!cliente) {
            throw new BusinessLogicException("The client with the given id was not found", BusinessError.NOT_FOUND);
        }

        return cliente.reportes;
    }

    async getClienteReporte(idCliente: string, idReporte: string): Promise<ReporteEntity> {

        const cliente: ClienteEntity = await this.clienteRepository.findOne({ where: { id: idCliente }, relations: ['reportes'] });
        if (!cliente) {
            throw new BusinessLogicException("The client with the given id was not found", BusinessError.NOT_FOUND);
        }

        const reporte: ReporteEntity = cliente.reportes.find(r => r.id === idReporte);
        if (!reporte) {
            throw new BusinessLogicException("The report with the given id was not found", BusinessError.NOT_FOUND);
        }

        return reporte;
    }

    async associateReportesCliente(idCliente: string, reportes: ReporteEntity[]): Promise<ClienteEntity> {

        const cliente: ClienteEntity = await this.clienteRepository.findOne({ where: { id: idCliente }, relations: ['reportes'] });
        if (!cliente) {
            throw new BusinessLogicException("The client with the given id was not found", BusinessError.NOT_FOUND);
        }

        for (let i = 0; i < reportes.length; i++) {
            const reporte: ReporteEntity = await this.reporteRepository.findOne({ where: { id: reportes[i].id } });
            if (!reporte)
                throw new BusinessLogicException("The report with the given id was not found", BusinessError.NOT_FOUND)
        }

        cliente.reportes = reportes;
        return await this.clienteRepository.save(cliente);
    }

}
