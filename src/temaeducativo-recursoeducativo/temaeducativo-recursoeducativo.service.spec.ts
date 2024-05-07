import { Test, TestingModule } from '@nestjs/testing';
import { TemaeducativoRecursoeducativoService } from './temaeducativo-recursoeducativo.service';
import { TemaEducativoEntity } from '../tema-educativo/tema-educativo.entity/tema-educativo.entity';
import { RecursoEducativoEntity } from '../recurso-educativo/recurso-educativo.entity/recurso-educativo.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

describe('TemaeducativoRecursoeducativoService', () => {
  let service: TemaeducativoRecursoeducativoService;
  let temaEducativoRepository: Repository<TemaEducativoEntity>;
  let recursoEducativoRepository: Repository<RecursoEducativoEntity>;
  let tema: TemaEducativoEntity;
  let recursoList: RecursoEducativoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [TemaeducativoRecursoeducativoService],
    }).compile();

    service = module.get<TemaeducativoRecursoeducativoService>(TemaeducativoRecursoeducativoService);
    temaEducativoRepository = module.get<Repository<TemaEducativoEntity>>(getRepositoryToken(TemaEducativoEntity));
    recursoEducativoRepository = module.get<Repository<RecursoEducativoEntity>>(getRepositoryToken(RecursoEducativoEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    recursoEducativoRepository.clear();
    temaEducativoRepository.clear();

    recursoList = [];
    for(let i = 0; i < 5; i++){
        const recurso: RecursoEducativoEntity = await recursoEducativoRepository.save({
          url: faker.internet.url(),
        })
        recursoList.push(recurso);
    }

    tema = await temaEducativoRepository.save({
      nombre: faker.lorem.word(),
      recursos: recursoList,
    })
  }

  it('addRecursoEducativoTema should add an educational resource to a category', async () => {
    const newRecurso: RecursoEducativoEntity = await recursoEducativoRepository.save({
      url: faker.internet.url(),
    });

    const newTema: TemaEducativoEntity = await temaEducativoRepository.save({
      nombre: faker.lorem.word(), 
    });

    const result: TemaEducativoEntity = await service.addRecursoEducativoTema(newTema.id, newRecurso.id);
    
    expect(result.recursos.length).toBe(1);
    expect(result.recursos[0]).not.toBeNull();
    expect(result.recursos[0].url).toBe(newRecurso.url);
  });

  it('addRecursoEducativoTema should return an error if the educational resource does not exists', async () => {
    const newRecurso: RecursoEducativoEntity = await recursoEducativoRepository.save({
      url: faker.internet.url(),
    });

    const temaId = 'invalid_id';
    try {
      await service.addRecursoEducativoTema(temaId, newRecurso.id);
    } catch (error) {
      expect(error.message).toBe('The category with the given id was not found');
    }
  });

  it('addRecursoEducativoTema should return an error if the category does not exist', async () => {
    const newTema: TemaEducativoEntity = await temaEducativoRepository.save({
      nombre: faker.lorem.word(),
    });

    const recursoId = 'invalid_id';
    try {
      await service.addRecursoEducativoTema(newTema.id, recursoId);
    } catch (error) {
      expect(error.message).toBe('The educational resource with the given id was not found');
    }
  });


  it('removeRecursoEducativoTema should remove an educational resource from a category', async () => {
    const storedRecurso: RecursoEducativoEntity = recursoList[0];
    const result: TemaEducativoEntity = await service.removeRecursoEducativoTema(tema.id, storedRecurso.id);
    expect(result.recursos.length).toBe(4);

    const storedTema: TemaEducativoEntity = await temaEducativoRepository.findOne({where: {id: result.id}, relations: ["recursos"]});
    const deletedRecurso: RecursoEducativoEntity = storedTema.recursos.find(r => r.id === storedRecurso.id);

    expect(deletedRecurso).toBeUndefined();
  });

  it('removeRecursoEducativoTema should return an error if the educational resource does not exists', async () => {
    const recursoId = 'invalid_id';
    try {
      await service.removeRecursoEducativoTema(tema.id, recursoId);
    } catch (error) {
      expect(error.message).toBe('The educational resource with the given id was not found');
    }
  });

  it('removeRecursoEducativoTema should return an error if the category does not exist', async () => {
    const storedRecurso: RecursoEducativoEntity = recursoList[0];
    const temaId = 'invalid_id';
    try {
      await service.removeRecursoEducativoTema(temaId, storedRecurso.id);
    } catch (error) {
      expect(error.message).toBe('The category with the given id was not found');
    }
  });

  it('getRecursosTema should get the resources associated to the given category', async () => {
    const result: RecursoEducativoEntity[] = await service.getRecursosTema(tema.id);
    expect(result).not.toBeNull();
    expect(result).toHaveLength(recursoList.length);
  });

  it('getRecursosTema should return an error if the category does not exist', async () => {
    const temaId = 'invalid_id';
    try {
      await service.getRecursosTema(temaId);
    } catch (error) {
      expect(error.message).toBe('The category with the given id was not found');
    }
  });

  it('getTemaRecurso should get the resource associated to the given category', async () => {
    const storedRecurso: RecursoEducativoEntity = recursoList[0];
    const result: RecursoEducativoEntity = await service.getTemaRecurso(tema.id, storedRecurso.id);
    expect(result).not.toBeNull();
    expect(result.url).toEqual(storedRecurso.url);
  });

  it('getTemaRecurso should return an error if the category does not exist', async () => {
    const storedRecurso: RecursoEducativoEntity = recursoList[0];
    const temaId = 'invalid_id';
    try {
      await service.getTemaRecurso(temaId, storedRecurso.id);
    } catch (error) {
      expect(error.message).toBe('The category with the given id was not found');
    }
  });

  it('getTemaRecurso should return an error if the resource does not exist', async () => {
    const recursoId = 'invalid_id';
    try {
      await service.getTemaRecurso(tema.id, recursoId);
    } catch (error) {
      expect(error.message).toBe('The educational resource with the given id was not found');
    }
  });

  it('associateRecursosTema should associate resources to the given category', async () => {
    const newrecursoList: RecursoEducativoEntity[] = [];
    for(let i = 0; i < 3; i++){
        const recurso: RecursoEducativoEntity = await recursoEducativoRepository.save({
          url: faker.internet.url(),
        })
        newrecursoList.push(recurso);
    }

    const result: TemaEducativoEntity = await service.associateRecursosTema(tema.id, newrecursoList);
    expect(result.recursos.length).toBe(3);
  });

  it('associateRecursosTema should return an error if the category does not exist', async () => {
    const newrecursoList: RecursoEducativoEntity[] = [];
    for(let i = 0; i < 3; i++){
        const recurso: RecursoEducativoEntity = await recursoEducativoRepository.save({
          url: faker.internet.url(),
        })
        newrecursoList.push(recurso);
    }

    const temaId = 'invalid_id';
    try {
      await service.associateRecursosTema(temaId, newrecursoList);
    } catch (error) {
      expect(error.message).toBe('The category with the given id was not found');
    }
  });

  it('associateRecursosTema should return an error if any of the resources given does not exist', async () => {
    const newrecursoList: RecursoEducativoEntity[] = [];
    for(let i = 0; i < 3; i++){
        const recurso: RecursoEducativoEntity = await recursoEducativoRepository.save({
          url: faker.internet.url(),
        })
        newrecursoList.push(recurso);
    }

    newrecursoList[0].id = 'invalid_id';
    try {
      await service.associateRecursosTema(tema.id, newrecursoList);
    } catch (error) {
      expect(error.message).toBe('The educational resource with the given id was not found');
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
