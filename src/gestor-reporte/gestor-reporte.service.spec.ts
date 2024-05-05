import { Test, TestingModule } from '@nestjs/testing';
import { GestorReporteService } from './gestor-reporte.service';

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
