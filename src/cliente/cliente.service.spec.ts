import { Test, TestingModule } from '@nestjs/testing';
import { ClienteService } from './cliente.service';
import { ClienteEntity } from './cliente.entity/cliente.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';


describe('ClienteService', () => {
  let service: ClienteService;
  let repository: Repository<ClienteEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ClienteService],
    }).compile();

    service = module.get<ClienteService>(ClienteService);
    repository = module.get<Repository<ClienteEntity>>(getRepositoryToken(ClienteEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  
});
