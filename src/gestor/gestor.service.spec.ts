import { Test, TestingModule } from '@nestjs/testing';
import { GestorService } from './gestor.service';
import { GestorEntity } from './gestor.entity/gestor.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('GestorService', () => {
  let service: GestorService;
  let repository: Repository<GestorEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [GestorService],
    }).compile();

    service = module.get<GestorService>(GestorService);
    repository = module.get<Repository<GestorEntity>>(getRepositoryToken(GestorEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
