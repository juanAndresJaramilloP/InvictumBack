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
  let clienteRepository: Repository<ClienteEntity>;
  let transferenciaRepository: Repository<TransferenciaEntity>;
  let cliente: ClienteEntity;
  let transferenciaList: TransferenciaEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ClienteTransferenciaService],
    }).compile();

    service = module.get<ClienteTransferenciaService>(ClienteTransferenciaService);
    clienteRepository = module.get<Repository<ClienteEntity>>(getRepositoryToken(ClienteEntity));
    transferenciaRepository = module.get<Repository<TransferenciaEntity>>(getRepositoryToken(TransferenciaEntity));

    await seedDatabase();
  });

  const seedDatabase = async () => {
    transferenciaRepository.clear();
    clienteRepository.clear();

    transferenciaList = [];
    for(let i = 0; i < 5; i++){
        const transferencia: TransferenciaEntity = await transferenciaRepository.save({
          monto: faker.number.int(),
          tipo: Number(faker.number.binary()),
        })
        transferenciaList.push(transferencia);
    }

    cliente = await clienteRepository.save({
      nombre: faker.person.fullName(), 
      correo: faker.internet.email(), 
      contrasena: faker.internet.password(), 
      rol: Number(faker.number.binary()), 
      balance: faker.number.int(),
      transferencias: transferenciaList,
    })
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
