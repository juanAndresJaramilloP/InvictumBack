import { Test, TestingModule } from '@nestjs/testing';
import { GestorReporteService } from './gestor-reporte.service';
import { GestorEntity } from '../gestor/gestor.entity/gestor.entity';
import { ReporteEntity } from '../reporte/reporte.entity/reporte.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

describe('GestorReporteService', () => {
  let service: GestorReporteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GestorReporteService],
    }).compile();

    service = module.get<GestorReporteService>(GestorReporteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
