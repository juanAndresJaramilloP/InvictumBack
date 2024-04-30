import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reporte } from '../reporte.entity/reporte.entity.js';
import { Usuario } from '../../usuario/usuario.entity/usuario.entity.js';
import { CreateReporteDto } from '../dto/CreateReporte.dto';

@Injectable()
export class ReportesService {
    constructor(
        @InjectRepository(Reporte)
        private reporteRepository: Repository<Reporte>,
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
    ) {}

    async create(createReporteDto: CreateReporteDto, usuarioId: number): Promise<Reporte> {
        // Utiliza findOne con opciones de búsqueda
        const usuario = await this.usuarioRepository.findOne({ where: { id: usuarioId } });
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }

        const reporte = this.reporteRepository.create(createReporteDto);
        reporte.usuario = usuario;
        return this.reporteRepository.save(reporte);
    }

    async findAll(): Promise<Reporte[]> {
        return this.reporteRepository.find({ relations: ['usuario'] });
    }
}
