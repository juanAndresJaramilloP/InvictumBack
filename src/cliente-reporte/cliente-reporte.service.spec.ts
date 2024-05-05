import { Test, TestingModule } from '@nestjs/testing';
import { ClienteReporteService } from './cliente-reporte.service';

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
