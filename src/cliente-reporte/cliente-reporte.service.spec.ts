import { Test, TestingModule } from '@nestjs/testing';
import { ClienteReporteService } from './cliente-reporte.service';
import { ClienteEntity } from '../cliente/cliente.entity/cliente.entity';
import { ReporteEntity } from '../reporte/reporte.entity/reporte.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';


describe('ClienteReporteService', () => {
  let service: ClienteReporteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClienteReporteService],
    }).compile();

    service = module.get<ClienteReporteService>(ClienteReporteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
