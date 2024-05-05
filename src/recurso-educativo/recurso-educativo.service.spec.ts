import { Test, TestingModule } from '@nestjs/testing';
import { RecursoEducativoService } from './recurso-educativo.service';
import { RecursoEducativoEntity } from './recurso-educativo.entity/recurso-educativo.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('RecursoEducativoService', () => {
  let service: RecursoEducativoService;
  let repository: Repository<RecursoEducativoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [RecursoEducativoService],
    }).compile();

    service = module.get<RecursoEducativoService>(RecursoEducativoService);
    repository = module.get<Repository<RecursoEducativoEntity>>(getRepositoryToken(RecursoEducativoEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
