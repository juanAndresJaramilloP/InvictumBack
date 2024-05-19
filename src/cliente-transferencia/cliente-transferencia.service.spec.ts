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

  it('addTransferenciaCliente should add a transferencia to a cliente', async () => {
    const transferencia = await transferenciaRepository.save({
      monto: faker.number.int(),
      tipo: Number(faker.number.binary()),
    });

    const clienteWithTransferencia = await service.addTransferenciaCliente(cliente.id, transferencia);
    expect(clienteWithTransferencia.transferencias).toHaveLength(6);
    expect(clienteWithTransferencia.transferencias).toContainEqual(transferencia);
  });

  it('addTransferenciaCliente should throw an error if the client does not exist', async () => {
    const transferencia = await transferenciaRepository.save({
      monto: faker.number.int(),
      tipo: Number(faker.number.binary()),
    });

    await expect(service.addTransferenciaCliente("FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF", transferencia)).rejects.toHaveProperty('message', 'The client with the given id was not found');
  });

  it('getTransferenciasCliente should get all transferencias from a cliente', async () => {
    const transferencias = await service.getTransferenciasCliente(cliente.id);
    expect(transferencias).toHaveLength(5);
    expect(transferencias).toEqual(transferenciaList);
  });

  it('getTransferenciasCliente should throw an error if the client does not exist', async () => {
    await expect(service.getTransferenciasCliente("FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF")).rejects.toHaveProperty('message', 'The client with the given id was not found');
  });

  it('getTransferenciaCliente should get a transferencia from a cliente', async () => {
    const transferencia = transferenciaList[0];
    const transferenciaFound = await service.getTransferenciaCliente(cliente.id, transferencia.id);
    expect(transferenciaFound).toEqual(transferencia);
  });

  it('getTransferenciaCliente should throw an error if the client does not exist', async () => {
    const transferencia = transferenciaList[0];
    await expect(service.getTransferenciaCliente("FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF", transferencia.id)).rejects.toHaveProperty('message', 'The client with the given id was not found');
  });

  it('getTransferenciaCliente should throw an error if the transferencia does not exist', async () => {
    await expect(service.getTransferenciaCliente(cliente.id, "FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF")).rejects.toHaveProperty('message', 'The transfer with the given id was not found');
  });
  
});
