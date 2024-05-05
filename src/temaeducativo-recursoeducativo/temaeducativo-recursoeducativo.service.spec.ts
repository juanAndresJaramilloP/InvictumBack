import { Test, TestingModule } from '@nestjs/testing';
import { TemaeducativoRecursoeducativoService } from './temaeducativo-recursoeducativo.service';

describe('TemaeducativoRecursoeducativoService', () => {
  let service: TemaeducativoRecursoeducativoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemaeducativoRecursoeducativoService],
    }).compile();

    service = module.get<TemaeducativoRecursoeducativoService>(TemaeducativoRecursoeducativoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
