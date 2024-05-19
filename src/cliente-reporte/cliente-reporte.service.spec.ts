import { Test, TestingModule } from '@nestjs/testing';
import { ClienteReporteService } from './cliente-reporte.service';
import { ClienteEntity } from '../cliente/cliente.entity/cliente.entity';
import { ReporteEntity } from '../reporte/reporte.entity/reporte.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';


describe('ClienteReporteService', () => {
  let service: ClienteReporteService;
  let clienteRepository: Repository<ClienteEntity>;
  let reporteRepository: Repository<ReporteEntity>;
  let cliente: ClienteEntity;
  let reporteList: ReporteEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ClienteReporteService],
    }).compile();

    service = module.get<ClienteReporteService>(ClienteReporteService);
    clienteRepository = module.get<Repository<ClienteEntity>>(getRepositoryToken(ClienteEntity));
    reporteRepository = module.get<Repository<ReporteEntity>>(getRepositoryToken(ReporteEntity));

    await seedDatabase();
  });

  const seedDatabase = async () => {
    reporteRepository.clear();
    clienteRepository.clear();

    reporteList = [];
    for(let i = 0; i < 5; i++){
        const reporte: ReporteEntity = await reporteRepository.save({
          archivo: faker.internet.url(),
        })
        reporteList.push(reporte);
    }

    cliente = await clienteRepository.save({
      nombre: faker.person.fullName(), 
      correo: faker.internet.email(), 
      contrasena: faker.internet.password(), 
      rol: Number(faker.number.binary()), 
      balance: faker.number.int(),
      reportes: reporteList,
    })
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addReporteCliente should add a report to a client', async () => {
    const newReporte: ReporteEntity = await reporteRepository.save({
      archivo: faker.internet.url(),
    });

    const newClient: ClienteEntity = await clienteRepository.save({
      nombre: faker.person.fullName(), 
      correo: faker.internet.email(), 
      contrasena: faker.internet.password(), 
      rol: Number(faker.number.binary()), 
      balance: faker.number.int(),
    });

    const result: ClienteEntity = await service.addReporteCliente(newClient.id, newReporte.id);
    
    expect(result.reportes.length).toBe(1);
    expect(result.reportes[0]).not.toBeNull();
    expect(result.reportes[0].archivo).toBe(newReporte.archivo);
  });

  it('addReporteCliente should throw an error if the client does not exist', async () => {
    const newReporte: ReporteEntity = await reporteRepository.save({
      archivo: faker.internet.url(),
    });

    const clientId = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
    try {
      await service.addReporteCliente(clientId, newReporte.id);
    } catch (error) {
      expect(error.message).toBe('The client with the given id was not found');
    }
  });

  it('addReporteCliente should throw an error if the report does not exist', async () => {
    const newClient: ClienteEntity = await clienteRepository.save({
      nombre: faker.person.fullName(), 
      correo: faker.internet.email(), 
      contrasena: faker.internet.password(), 
      rol: Number(faker.number.binary()), 
      balance: faker.number.int(),
    });

    const reportId = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
    try {
      await service.addReporteCliente(newClient.id, reportId);
    } catch (error) {
      expect(error.message).toBe('The report with the given id was not found');
    }
  });

  it('getReportesCliente should return all reports from a client', async () => {
    const result: ReporteEntity[] = await service.getReportesCliente(cliente.id);
    expect(result).not.toBeNull();
    expect(result).toHaveLength(reporteList.length);
  });

  it('getReportesCliente should throw an error if the client does not exist', async () => {
    const clientId = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
    try {
      await service.getReportesCliente(clientId);
    } catch (error) {
      expect(error.message).toBe('The client with the given id was not found');
    }
  });

  it('getClienteReporte should return a report from a client', async () => {
    const storedReport: ReporteEntity = reporteList[0];
    const result: ReporteEntity = await service.getClienteReporte(cliente.id, storedReport.id);
    expect(result).not.toBeNull();
    expect(result.archivo).toEqual(storedReport.archivo);
  });

  it('getClienteReporte should throw an error if the client does not exist', async () => {
    const storedReport: ReporteEntity = reporteList[0];
    const clientId = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
    try {
      await service.getClienteReporte(clientId, storedReport.id);
    } catch (error) {
      expect(error.message).toBe('The client with the given id was not found');
    }
  });

  it('getClienteReporte should throw an error if the report does not exist', async () => {
    const reportId = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
    try {
      await service.getClienteReporte(cliente.id, reportId);
    } catch (error) {
      expect(error.message).toBe('The report with the given id was not found');
    }
  });

  it('removeReporteCliente should remove a report from a client', async () => {
    const storedReport: ReporteEntity = reporteList[0];
    const result: ClienteEntity = await service.removeReporteCliente(cliente.id, storedReport.id);
    expect(result.reportes.length).toBe(4);

    const storedClient: ClienteEntity = await clienteRepository.findOne({where: {id: result.id}, relations: ["reportes"]});
    const deletedReporte: ReporteEntity = storedClient.reportes.find(r => r.id === storedReport.id);

    expect(deletedReporte).toBeUndefined();
  });

  it('removeReporteCliente should throw an error if the client does not exist', async () => {
    const storedReport: ReporteEntity = reporteList[0];
    const clientId = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
    try {
      await service.removeReporteCliente(clientId, storedReport.id);
    } catch (error) {
      expect(error.message).toBe('The client with the given id was not found');
    }
  });

  it('removeReporteCliente should throw an error if the report does not exist', async () => {
    const reportId = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
    try {
      await service.removeReporteCliente(cliente.id, reportId);
    } catch (error) {
      expect(error.message).toBe('The report with the given id was not found');
    }
  });

  it('associateReportesCliente should associate reports to a client', async () => {
    const newReporteList: ReporteEntity[] = [];
    for(let i = 0; i < 3; i++){
        const reporte: ReporteEntity = await reporteRepository.save({
          archivo: faker.internet.url(),
        })
        newReporteList.push(reporte);
    }

    const result: ClienteEntity = await service.associateReportesCliente(cliente.id, newReporteList);
    expect(result.reportes.length).toBe(3);
  });

  it('associateReportesCliente should throw an error if the client does not exist', async () => {
    const newReporteList: ReporteEntity[] = [];
    for(let i = 0; i < 3; i++){
        const reporte: ReporteEntity = await reporteRepository.save({
          archivo: faker.internet.url(),
        })
        newReporteList.push(reporte);
    }

    const clientId = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
    try {
      await service.associateReportesCliente(clientId, newReporteList);
    } catch (error) {
      expect(error.message).toBe('The client with the given id was not found');
    }
  });

  it('associateReportesCliente should throw an error if the report does not exist', async () => {
    const newReporteList: ReporteEntity[] = [];
    for(let i = 0; i < 3; i++){
        const reporte: ReporteEntity = await reporteRepository.save({
          archivo: faker.internet.url(),
        })
        newReporteList.push(reporte);
    }

    newReporteList[0].id = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
    try {
      await service.associateReportesCliente(cliente.id, newReporteList);
    } catch (error) {
      expect(error.message).toBe('The report with the given id was not found');
    }
  });

});
