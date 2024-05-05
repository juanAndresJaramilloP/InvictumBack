import { Test, TestingModule } from '@nestjs/testing';
import { ClienteTransferenciaService } from './cliente-transferencia.service';
import { ClienteEntity } from '../cliente/cliente.entity/cliente.entity';
import { TransferenciaEntity } from '../transferencia/transferencia.entity/transferencia.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

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
