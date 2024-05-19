import { Test, TestingModule } from '@nestjs/testing';
import { GestorReporteService } from './gestor-reporte.service';
import { GestorEntity } from '../gestor/gestor.entity/gestor.entity';
import { ReporteEntity } from '../reporte/reporte.entity/reporte.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

describe('GestorReporteService', () => {
  let service: GestorReporteService;
  let gestorRepository: Repository<GestorEntity>;
  let reporteRepository: Repository<ReporteEntity>;
  let gestor: GestorEntity;
  let reporteList: ReporteEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [GestorReporteService],
    }).compile();

    service = module.get<GestorReporteService>(GestorReporteService);
    gestorRepository = module.get<Repository<GestorEntity>>(getRepositoryToken(GestorEntity));
    reporteRepository = module.get<Repository<ReporteEntity>>(getRepositoryToken(ReporteEntity));

    await seedDatabase();
  });

  const seedDatabase = async () => {
    reporteRepository.clear();
    gestorRepository.clear();

    reporteList = [];
    for(let i = 0; i < 5; i++){
        const reporte: ReporteEntity = await reporteRepository.save({
          archivo: faker.internet.url(),
        })
        reporteList.push(reporte);
    }

    gestor = await gestorRepository.save({
      nombre: faker.person.fullName(), 
      correo: faker.internet.email(), 
      contrasena: faker.internet.password(), 
      rol: Number(faker.number.binary()), 
      aba: faker.number.int(),
      reportes: reporteList,
    })
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addReporteGestor should add a report to a manager', async () => {
    const newReporte: ReporteEntity = await reporteRepository.save({
      archivo: faker.internet.url(),
    });

    const newGestor: GestorEntity = await gestorRepository.save({
      nombre: faker.person.fullName(), 
      correo: faker.internet.email(), 
      contrasena: faker.internet.password(), 
      rol: Number(faker.number.binary()), 
      aba: faker.number.int(),
    });

    const result: GestorEntity = await service.addReporteGestor(newGestor.id, newReporte.id);
    
    expect(result.reportes.length).toBe(1);
    expect(result.reportes[0]).not.toBeNull();
    expect(result.reportes[0].archivo).toBe(newReporte.archivo);
  });

  it('addReporteGestor should throw an error if the manager does not exist', async () => {
    const newReporte: ReporteEntity = await reporteRepository.save({
      archivo: faker.internet.url(),
    });

    const managerId = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
    try {
      await service.addReporteGestor(managerId, newReporte.id);
    } catch (error) {
      expect(error.message).toBe('The manager with the given id was not found');
    }
  });

  it('addReporteGestor should throw an error if the report does not exist', async () => {
    const newManager: GestorEntity = await gestorRepository.save({
      nombre: faker.person.fullName(), 
      correo: faker.internet.email(), 
      contrasena: faker.internet.password(), 
      rol: Number(faker.number.binary()), 
      aba: faker.number.int(),
    });

    const reportId = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
    try {
      await service.addReporteGestor(newManager.id, reportId);
    } catch (error) {
      expect(error.message).toBe('The report with the given id was not found');
    }
  });

  it('getReportesGestor should return all reports from a manager', async () => {
    const result: ReporteEntity[] = await service.getReportesGestor(gestor.id);
    expect(result).not.toBeNull();
    expect(result).toHaveLength(reporteList.length);
  });

  it('getReportesGestor should throw an error if the manager does not exist', async () => {
    const managerId = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
    try {
      await service.getReportesGestor(managerId);
    } catch (error) {
      expect(error.message).toBe('The manager with the given id was not found');
    }
  });

  it('getGestorReporte should return a report from a manager', async () => {
    const storedReport: ReporteEntity = reporteList[0];
    const result: ReporteEntity = await service.getGestorReporte(gestor.id, storedReport.id);
    expect(result).not.toBeNull();
    expect(result.archivo).toEqual(storedReport.archivo);
  });

  it('getGestorReporte should throw an error if the manager does not exist', async () => {
    const storedReport: ReporteEntity = reporteList[0];
    const managerId = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
    try {
      await service.getGestorReporte(managerId, storedReport.id);
    } catch (error) {
      expect(error.message).toBe('The manager with the given id was not found');
    }
  });

  it('getGestorReporte should throw an error if the report does not exist', async () => {
    const reportId = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
    try {
      await service.getGestorReporte(gestor.id, reportId);
    } catch (error) {
      expect(error.message).toBe('The report with the given id was not found');
    }
  });

  it('removeReporteGestor should remove a report from a manager', async () => {
    const storedReport: ReporteEntity = reporteList[0];
    const result: GestorEntity = await service.removeReporteGestor(gestor.id, storedReport.id);
    expect(result.reportes.length).toBe(4);

    const storedManager: GestorEntity = await gestorRepository.findOne({where: {id: result.id}, relations: ["reportes"]});
    const deletedReporte: ReporteEntity = storedManager.reportes.find(r => r.id === storedReport.id);

    expect(deletedReporte).toBeUndefined();
  });

  it('removeReporteGestor should throw an error if the manager does not exist', async () => {
    const storedReport: ReporteEntity = reporteList[0];
    const managerId = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
    try {
      await service.removeReporteGestor(managerId, storedReport.id);
    } catch (error) {
      expect(error.message).toBe('The manager with the given id was not found');
    }
  });

  it('removeReporteGestor should throw an error if the report does not exist', async () => {
    const reportId = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
    try {
      await service.removeReporteGestor(gestor.id, reportId);
    } catch (error) {
      expect(error.message).toBe('The report with the given id was not found');
    }
  });

  it('associateReportesGestor should associate reports to a manager', async () => {
    const newReporteList: ReporteEntity[] = [];
    for(let i = 0; i < 3; i++){
        const reporte: ReporteEntity = await reporteRepository.save({
          archivo: faker.internet.url(),
        })
        newReporteList.push(reporte);
    }

    const result: GestorEntity = await service.associateReportesGestor(gestor.id, newReporteList);
    expect(result.reportes.length).toBe(3);
  });

  it('associateReportesGestor should throw an error if the manager does not exist', async () => {
    const newReporteList: ReporteEntity[] = [];
    for(let i = 0; i < 3; i++){
        const reporte: ReporteEntity = await reporteRepository.save({
          archivo: faker.internet.url(),
        })
        newReporteList.push(reporte);
    }

    const managerId = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
    try {
      await service.associateReportesGestor(managerId, newReporteList);
    } catch (error) {
      expect(error.message).toBe('The manager with the given id was not found');
    }
  });

  it('associateReportesGestor should throw an error if the report does not exist', async () => {
    const newReporteList: ReporteEntity[] = [];
    for(let i = 0; i < 3; i++){
        const reporte: ReporteEntity = await reporteRepository.save({
          archivo: faker.internet.url(),
        })
        newReporteList.push(reporte);
    }

    newReporteList[0].id = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
    try {
      await service.associateReportesGestor(gestor.id, newReporteList);
    } catch (error) {
      expect(error.message).toBe('The report with the given id was not found');
    }
  });

});
