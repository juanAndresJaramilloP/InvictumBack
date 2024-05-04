import { Test, TestingModule } from '@nestjs/testing';
import { ReporteService } from './reporte.service';
import { ReporteEntity } from './reporte.entity/reporte.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ReporteService', () => {
  let service: ReporteService;
  let repository: Repository<ReporteEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ReporteService],
    }).compile();

    service = module.get<ReporteService>(ReporteService);
    repository = module.get<Repository<ReporteEntity>>(getRepositoryToken(ReporteEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
