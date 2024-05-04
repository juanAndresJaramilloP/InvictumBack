import { Test, TestingModule } from '@nestjs/testing';
import { TransferenciaService } from './transferencia.service';
import { TransferenciaEntity } from './transferencia.entity/transferencia.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('TransferenciaService', () => {
  let service: TransferenciaService;
  let repository: Repository<TransferenciaEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [TransferenciaService],
    }).compile();

    service = module.get<TransferenciaService>(TransferenciaService);
    repository = module.get<Repository<TransferenciaEntity>>(getRepositoryToken(TransferenciaEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
