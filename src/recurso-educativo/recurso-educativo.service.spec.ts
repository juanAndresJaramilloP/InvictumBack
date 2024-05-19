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
  let recursoEducativoList: RecursoEducativoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [RecursoEducativoService],
    }).compile();

    service = module.get<RecursoEducativoService>(RecursoEducativoService);
    repository = module.get<Repository<RecursoEducativoEntity>>(getRepositoryToken(RecursoEducativoEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    recursoEducativoList = [];
    for(let i = 0; i < 5; i++){
      const recurso: RecursoEducativoEntity = await repository.save({
        url: faker.internet.url(),
        name: faker.person.firstName()

      });
      recursoEducativoList.push(recurso);
    }
  }
  
  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  it('FindAll should return all educational resources', async () => {
    const result: RecursoEducativoEntity[] = await service.findAll();
    expect(result).not.toBeNull();
    expect(result).toHaveLength(recursoEducativoList.length);
  });

  it('FindOne should return an educational resource by id', async () => {
    const storedRecurso: RecursoEducativoEntity = recursoEducativoList[0];
    const result = await service.findOne(storedRecurso.id);
    expect(result).not.toBeNull();
    expect(result.url).toEqual(storedRecurso.url);
    expect(result.name).toEqual(storedRecurso.name);
  });

  it('FindOne should throw an exception when the educational resource does not exist', async () => {
    const id = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF'
    try {
      await service.findOne(id);
    } catch (error) {
      expect(error.message).toEqual("The educational resource with the given id was not found");
    }
  });

  it('Create should add a new educational resource', async () => {
    const newRecurso: RecursoEducativoEntity = {
      id:"",
      url: faker.internet.url(),
      tema: null,
      name: faker.person.firstName()
    };
    const result = await service.create(newRecurso);
    expect(result).not.toBeNull();
    expect(result.url).toEqual(newRecurso.url);
    expect(result.name).toEqual(newRecurso.name);
  });

  it('Update should modify an existing educational resource', async () => {
    const storedRecurso: RecursoEducativoEntity = recursoEducativoList[0];
    storedRecurso.url = faker.internet.url();
    storedRecurso.name = faker.person.firstName();
    const result = await service.update(storedRecurso.id, storedRecurso);
    const storedRecursoModified: RecursoEducativoEntity = await repository.findOne({where:{id: storedRecurso.id}});
    
    expect(storedRecursoModified).not.toBeNull();
    expect(storedRecursoModified.url).toEqual(result.url);
    expect(storedRecursoModified.name).toEqual(result.name);
  });

  it('Update should throw an exception when the educational resource does not exist', async () => {
    const id = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
    const newRecurso: RecursoEducativoEntity = {
      id: id,
      url: faker.internet.url(),
      tema: null,
      name: faker.person.firstName()
    }
    try {
      await service.update(id, newRecurso);
    } catch (error) {
      expect(error.message).toEqual("The educational resource with the given id was not found");
    }
  });

  it('Delete should remove an existing educational resource', async () => {
    const storedRecurso: RecursoEducativoEntity = recursoEducativoList[0];
    await service.delete(storedRecurso.id);
    const result = await repository.findOne({where:{id: storedRecurso.id}});
    expect(result).toBeNull();
  });

  it("Delete should throw an exception when the educational resource does not exist", async () => {
    const id = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
    try {
      await service.delete(id);
    } catch (error) {
      expect(error.message).toEqual("The educational resource with the given id was not found");
    }
  });

});
