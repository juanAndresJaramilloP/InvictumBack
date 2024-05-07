import { Test, TestingModule } from '@nestjs/testing';
import { TransferenciaService } from './transferencia.service';
import { TransferenciaEntity } from './transferencia.entity/transferencia.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('TransferenciaService', () => {
  let service: TransferenciaService;
  let repository: Repository<TransferenciaEntity>;
  let transferenciaList: TransferenciaEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [TransferenciaService],
    }).compile();

    service = module.get<TransferenciaService>(TransferenciaService);
    repository = module.get<Repository<TransferenciaEntity>>(getRepositoryToken(TransferenciaEntity));

    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    transferenciaList = [];
    for(let i = 0; i < 5; i++){
      const transferencia: TransferenciaEntity = await repository.save({
        monto: faker.number.int(),
        tipo: Number(faker.number.binary()),
      });
      transferenciaList.push(transferencia);
    }
  }

  it('Create should create a new transfer', async () => {
    const newTransferencia: TransferenciaEntity = await repository.save({
      monto: faker.number.int(),
      tipo: Number(faker.number.binary()),
    });

    const result = await service.create(newTransferencia);
    expect(result).not.toBeNull();
    expect(result.monto).toEqual(newTransferencia.monto);
    expect(result.tipo).toEqual(newTransferencia.tipo);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
