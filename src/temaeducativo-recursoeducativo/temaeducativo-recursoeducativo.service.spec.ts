import { Test, TestingModule } from '@nestjs/testing';
import { TemaeducativoRecursoeducativoService } from './temaeducativo-recursoeducativo.service';
import { TemaEducativoEntity } from '../tema-educativo/tema-educativo.entity/tema-educativo.entity';
import { RecursoEducativoEntity } from '../recurso-educativo/recurso-educativo.entity/recurso-educativo.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

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
