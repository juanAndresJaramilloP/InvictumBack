import { Test, TestingModule } from '@nestjs/testing';
import { GestorService } from './gestor.service';
import { GestorEntity } from './gestor.entity/gestor.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('GestorService', () => {
  let service: GestorService;
  let repository: Repository<GestorEntity>;
  let gestorList: GestorEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [GestorService],
    }).compile();

    service = module.get<GestorService>(GestorService);
    repository = module.get<Repository<GestorEntity>>(getRepositoryToken(GestorEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    gestorList = [];
    for(let i = 0; i < 5; i++){
      const gestor: GestorEntity = await repository.save({
        nombre: faker.person.fullName(), 
        correo: faker.internet.email(), 
        contrasena: faker.internet.password(), 
        rol: Number(faker.number.binary()), 
        aba: faker.number.int(),
      });
      gestorList.push(gestor);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all managers', async () => {
    const result: GestorEntity[] = await service.findAll();
    expect(result).not.toBeNull();
    expect(result).toHaveLength(gestorList.length);
  });

  it('findOne should return a manager by id', async () => {
    const storedManager: GestorEntity = gestorList[0];
    const result = await service.findOne(storedManager.id);
    expect(result).not.toBeNull();
    expect(result.nombre).toEqual(storedManager.nombre);
    expect(result.correo).toEqual(storedManager.correo);
    expect(result.contrasena).toEqual(storedManager.contrasena);
    expect(result.rol).toEqual(storedManager.rol);
    expect(result.aba).toEqual(storedManager.aba);
  });

  it('findOne should throw an error if the manager does not exist', async () => {
    const managerId = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
    try {
      await service.findOne(managerId);
    } catch (error) {
      expect(error.message).toBe('The manager with the given id was not found');
    }
  });

  it('should create a new manager', async () => {
    const newManager: GestorEntity = {
      id: "",
      nombre: 'John Doe',
      correo: 'johndoe@example.com',
      contrasena: 'password',
      rol: 1,
      aba: 100.0,
      reportes: []
    };
    const result = await service.create(newManager);
    expect(result.nombre).toEqual(newManager.nombre);
    expect(result.correo).toEqual(newManager.correo);
    expect(result.contrasena).toEqual(newManager.contrasena);
    expect(result.rol).toEqual(newManager.rol);
    expect(result.aba).toEqual(newManager.aba);
  });

  it('should update a manager by id', async () => {
    const manager = gestorList[0];
    manager.nombre = 'Jane Doe';
    manager.contrasena = 'newpassword';

    const updatedManager = await service.update(manager.id, manager);
    expect(updatedManager).not.toBeNull();

    const storedManager: GestorEntity =  await repository.findOne({where:{id: manager.id}});
    expect(storedManager.nombre).toEqual(manager.nombre);
    expect(storedManager.contrasena).toEqual(manager.contrasena);

  });

  it('update should throw an exception for an invalid manager', async () => {
    let manager: GestorEntity = gestorList[0];
    manager = {
      ...manager, nombre: "New name", contrasena: "newpassword"
    }
    await expect(() => service.update("FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF", manager)).rejects.toHaveProperty("message", "The manager with the given id was not found");
  });

  it('should delete a manager by id', async () => {
    const managerId = gestorList[0].id;
    await service.delete(managerId);
    const result = await repository.findOne({where:{id: managerId}});
    expect(result).toBeNull();
  });

  it('delete should throw an exception for an invalid manager', async () => {
    const manager: GestorEntity = gestorList[0];
    await service.delete(manager.id);
    await expect(() => service.delete("FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF")).rejects.toHaveProperty("message", "The manager with the given id was not found")
  });

});
