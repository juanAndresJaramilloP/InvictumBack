import { Test, TestingModule } from '@nestjs/testing';
import { TemaEducativoService } from './tema-educativo.service';
import { TemaEducativoEntity } from './tema-educativo.entity/tema-educativo.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('TemaEducativoService', () => {
  let service: TemaEducativoService;
  let repository: Repository<TemaEducativoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [TemaEducativoService],
    }).compile();

    service = module.get<TemaEducativoService>(TemaEducativoService);
    repository = module.get<Repository<TemaEducativoEntity>>(getRepositoryToken(TemaEducativoEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
