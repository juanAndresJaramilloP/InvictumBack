import { Test, TestingModule } from '@nestjs/testing';
import { ClienteService } from './cliente.service';
import { ClienteEntity } from './cliente.entity/cliente.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';


describe('ClienteService', () => {
  let service: ClienteService;
  let repository: Repository<ClienteEntity>;
  let clienteList: ClienteEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ClienteService],
    }).compile();

    service = module.get<ClienteService>(ClienteService);
    repository = module.get<Repository<ClienteEntity>>(getRepositoryToken(ClienteEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    clienteList = [];
    for(let i = 0; i < 5; i++){
      const client: ClienteEntity = await repository.save({
        nombre: faker.person.fullName(), 
        correo: faker.internet.email(), 
        contrasena: faker.internet.password(), 
        rol: Number(faker.number.binary()), 
        balance: faker.number.int(),
      });
      clienteList.push(client);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all clients', async () => {
    const result: ClienteEntity[] = await service.findAll();
    expect(result).not.toBeNull();
    expect(result).toHaveLength(clienteList.length);
  });

  it('findOne should return a client by id', async () => {
    const storedClient: ClienteEntity = clienteList[0];
    const result = await service.findOne(storedClient.id);
    expect(result).not.toBeNull();
    expect(result.nombre).toEqual(storedClient.nombre);
    expect(result.correo).toEqual(storedClient.correo);
    expect(result.contrasena).toEqual(storedClient.contrasena);
    expect(result.rol).toEqual(storedClient.rol);
    expect(result.balance).toEqual(storedClient.balance);
  });

  it('findOne should throw an error if the client does not exist', async () => {
    const clientId = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
    try {
      await service.findOne(clientId);
    } catch (error) {
      expect(error.message).toBe('The client with the given id was not found');
    }
  });

  it('Create should create a new client', async () => {
    const newClient: ClienteEntity = {
      id: "",
      nombre: 'John Doe',
      correo: 'johndoe@example.com',
      contrasena: 'password',
      rol: 1,
      balance: 100.0,
      transferencias: [],
      reportes: []
    };
    const result = await service.create(newClient);
    expect(result.nombre).toEqual(newClient.nombre);
    expect(result.correo).toEqual(newClient.correo);
    expect(result.contrasena).toEqual(newClient.contrasena);
    expect(result.rol).toEqual(newClient.rol);
    expect(result.balance).toEqual(newClient.balance);
  });

  it('Update should update a client by id', async () => {
    const client = clienteList[0];
    client.nombre = 'Jane Doe';
    client.contrasena = 'newpassword';

    const updatedClient = await service.update(client.id, client);
    expect(updatedClient).not.toBeNull();

    const storedClient: ClienteEntity =  await repository.findOne({where:{id: client.id}});
    expect(storedClient.nombre).toEqual(client.nombre);
    expect(storedClient.contrasena).toEqual(client.contrasena);

  });

  it('Update should throw an exception for an invalid client', async () => {
    let client: ClienteEntity = clienteList[0];
    client = {
      ...client, nombre: "New name", contrasena: "newpassword"
    }
    await expect(() => service.update("FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF", client)).rejects.toHaveProperty("message", "The client with the given id was not found");
  });

  it('Delete should delete a client by id', async () => {
    const clientId = clienteList[0].id;
    await service.delete(clientId);
    const result = await repository.findOne({where:{id: clientId}});
    expect(result).toBeNull();
  });

  it('Delete should throw an exception for an invalid client', async () => {
    const client: ClienteEntity = clienteList[0];
    await service.delete(client.id);
    await expect(() => service.delete("FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF")).rejects.toHaveProperty("message", "The client with the given id was not found")
  });
  
});
