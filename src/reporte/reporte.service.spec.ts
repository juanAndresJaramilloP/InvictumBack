import { Test, TestingModule } from '@nestjs/testing';
import { ReporteService } from './reporte.service';
import { ReporteEntity } from './reporte.entity/reporte.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('ReporteService', () => {
  let service: ReporteService;
  let repository: Repository<ReporteEntity>;
  let reporteList: ReporteEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ReporteService],
    }).compile();

    service = module.get<ReporteService>(ReporteService);
    repository = module.get<Repository<ReporteEntity>>(getRepositoryToken(ReporteEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    reporteList = [];
    for(let i = 0; i < 5; i++){
      const reporte: ReporteEntity = await repository.save({
        archivo: faker.internet.url(),
      });
      reporteList.push(reporte);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('FindAll should return all reports', async () => {
    const result: ReporteEntity[] = await service.findAll();
    expect(result).not.toBeNull();
    expect(result).toHaveLength(reporteList.length);
  });

  it('FindOne should return a report by id', async () => {
    const storedReport: ReporteEntity = reporteList[0];
    const result = await service.findOne(storedReport.id);
    expect(result).not.toBeNull();
    expect(result.archivo).toEqual(storedReport.archivo);
  });

  it('FindOne should throw an exception when the report does not exist', async () => {
    const id = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF'
    try {
      await service.findOne(id);
    } catch (error) {
      expect(error.message).toEqual("The report with the given id was not found");
    }
  });

  it('Create should return the created report', async () => {
    const reporte: ReporteEntity = {
      id: "",
      archivo: faker.internet.url(),
      cliente: null,
      gestor: null,
    };
    const result = await service.create(reporte);
    expect(result).not.toBeNull();
    expect(result.archivo).toEqual(reporte.archivo);
  });

  it('Update should return the updated report', async () => {
    const storedReport: ReporteEntity = reporteList[0];
    const archivo = faker.internet.url();
    storedReport.archivo = archivo;
    const result = await service.update(storedReport.id, storedReport);
    expect(result).not.toBeNull();
    expect(result.archivo).toEqual(archivo);
  });

  it('Update should throw an exception when the report does not exist', async () => {
    const storedReporte: ReporteEntity = reporteList[0];
    const id = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF'
    storedReporte.id = id;
    try {
      await service.update(id, storedReporte);
    } catch (error) {
      expect(error.message).toEqual("The report with the given id was not found");
    }
  });

  it('Delete should remove the report', async () => {
    const storedReport: ReporteEntity = reporteList[0];
    await service.delete(storedReport.id);
    const result = await repository.findOne({where:{id: storedReport.id}});
    expect(result).toBeNull();
  });

  it("Delete should throw an exception when the report does not exist", async () => {
    const id = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
    try {
      await service.delete(id);
    } catch (error) {
      expect(error.message).toEqual("The report with the given id was not found");
    }
  });

});
