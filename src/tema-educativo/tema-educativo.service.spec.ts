import { Test, TestingModule } from '@nestjs/testing';
import { TemaEducativoService } from './tema-educativo.service';
import { TemaEducativoEntity } from './tema-educativo.entity/tema-educativo.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('TemaEducativoService', () => {
  let service: TemaEducativoService;
  let repository: Repository<TemaEducativoEntity>;
  let temaList: TemaEducativoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [TemaEducativoService],
    }).compile();

    service = module.get<TemaEducativoService>(TemaEducativoService);
    repository = module.get<Repository<TemaEducativoEntity>>(getRepositoryToken(TemaEducativoEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    temaList = [];
    for(let i = 0; i < 5; i++){
      const tema: TemaEducativoEntity = await repository.save({
        nombre: faker.lorem.word(),
      });
      temaList.push(tema);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('FindAll should return all educational themes', async () => {
    const result: TemaEducativoEntity[] = await service.findAll();
    expect(result).not.toBeNull();
    expect(result).toHaveLength(temaList.length);
  });

  it('FindOne should return an educational theme by id', async () => {
    const storedTema: TemaEducativoEntity = temaList[0];
    const result = await service.findOne(storedTema.id);
    expect(result).not.toBeNull();
    expect(result.nombre).toEqual(storedTema.nombre);
  });

  it('FindOne should throw an exception when the educational theme does not exist', async () => {
    const id = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF'
    try {
      await service.findOne(id);
    } catch (error) {
      expect(error.message).toEqual("The educational theme with the given id was not found");
    }
  });

  it('Create should create a new educational theme', async () => {
    const newTema: TemaEducativoEntity = {
      id: "",
      nombre: faker.lorem.word(),
      recursos: [],
    };
    const result = await service.create(newTema);
    expect(result).not.toBeNull();
    expect(result.nombre).toEqual(newTema.nombre);
  });

  it('Update should update an existing educational theme', async () => {
    const storedTema: TemaEducativoEntity = temaList[0];
    const nombre = faker.lorem.word();
    storedTema.nombre = nombre;
    const result = await service.update(storedTema.id, storedTema);
    expect(result).not.toBeNull();
    expect(result.nombre).toEqual(nombre);
  });

  it('Update should throw an exception when the educational theme does not exist', async () => {
    const storedTema: TemaEducativoEntity = temaList[0];
    const id = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF'
    storedTema.id = id;
    try {
      await service.update(id, storedTema);
    } catch (error) {
      expect(error.message).toEqual("The educational theme with the given id was not found");
    }
  });

  it('Delete should delete an existing educational theme', async () => {
    const storedTema: TemaEducativoEntity = temaList[0];
    await service.delete(storedTema.id);
    const result = await repository.findOne({where:{id: storedTema.id}});
    expect(result).toBeNull();
  });

  it('Delete should throw an exception when the educational theme does not exist', async () => {
    const id = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF'
    try {
      await service.delete(id);
    } catch (error) {
      expect(error.message).toEqual("The educational theme with the given id was not found");
    }
  });

});
