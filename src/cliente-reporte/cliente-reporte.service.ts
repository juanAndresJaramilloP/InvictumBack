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

        if (!/^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/.test(idCliente) || !/^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/.test(idReporte)) {
            throw new BusinessLogicException("Invalid id format. HINT: Valid UUID values are of the form \'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF\'", BusinessError.BAD_REQUEST);
        }

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

        if (!/^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/.test(idCliente) || !/^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/.test(idReporte)) {
            throw new BusinessLogicException("Invalid id format. HINT: Valid UUID values are of the form \'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF\'", BusinessError.BAD_REQUEST);
        }

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

        if (!/^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/.test(idCliente)) {
            throw new BusinessLogicException("Invalid id format. HINT: Valid UUID values are of the form \'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF\'", BusinessError.BAD_REQUEST);
        }

        const cliente: ClienteEntity = await this.clienteRepository.findOne({ where: { id: idCliente }, relations: ['reportes'] });
        if (!cliente) {
            throw new BusinessLogicException("The client with the given id was not found", BusinessError.NOT_FOUND);
        }

        return cliente.reportes;
    }

    async getClienteReporte(idCliente: string, idReporte: string): Promise<ReporteEntity> {

        if (!/^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/.test(idCliente) || !/^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/.test(idReporte)) {
            throw new BusinessLogicException("Invalid id format. HINT: Valid UUID values are of the form \'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF\'", BusinessError.BAD_REQUEST);
        }

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

    async associateReportesCliente(idCliente: string, Ids: string[]) {

        if (!/^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/.test(idCliente)) {
            throw new BusinessLogicException("Invalid id format. HINT: Valid UUID values are of the form 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF'", BusinessError.BAD_REQUEST);
        }
    
        const cliente: ClienteEntity = await this.clienteRepository.findOne({ where: { id: idCliente }, relations: ['reportes'] });
        if (!cliente) {
            throw new BusinessLogicException("The client with the given id was not found", BusinessError.NOT_FOUND);
        }

        const reportes: ReporteEntity[] = [];
    
        for (let i = 0; i < Ids.length; i++) {
            const reporte: ReporteEntity = await this.reporteRepository.findOne({ where: { id: Ids[i] } });
            if (!reporte) {
                throw new BusinessLogicException("The report with the given id was not found", BusinessError.NOT_FOUND);
            }
            reportes.push(reporte);
        }
    
        cliente.reportes = reportes;
        return await this.clienteRepository.save(cliente);
    }
    
}
