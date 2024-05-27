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
        archivo: "../../uploads/1716772936823-Parcial2.pdf",
        titulo: faker.lorem.word(),
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
      archivo: "../../uploads/1716772936823-Parcial2.pdf",
      titulo: faker.lorem.word(),
      cliente: null,
      gestor: null,
    };
    const result = await service.create(reporte);
    expect(result).not.toBeNull();
    expect(result.archivo).toEqual(reporte.archivo);
  });

});
