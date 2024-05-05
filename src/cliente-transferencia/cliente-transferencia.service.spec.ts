import { Test, TestingModule } from '@nestjs/testing';
import { ClienteTransferenciaService } from './cliente-transferencia.service';

describe('ClienteTransferenciaService', () => {
  let service: ClienteTransferenciaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClienteTransferenciaService],
    }).compile();

    service = module.get<ClienteTransferenciaService>(ClienteTransferenciaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
