/* eslint-disable prettier/prettier */
/* archivo src/shared/testing-utils/typeorm-testing-config.ts*/
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteEntity } from 'src/cliente/cliente.entity/cliente.entity';
import { GestorEntity } from 'src/gestor/gestor.entity/gestor.entity';
import { RecursoEducativoEntity } from 'src/recurso-educativo/recurso-educativo.entity/recurso-educativo.entity';
import { ReporteEntity } from 'src/reporte/reporte.entity/reporte.entity';
import { TemaEducativoEntity } from 'src/tema-educativo/tema-educativo.entity/tema-educativo.entity';
import { TransferenciaEntity } from 'src/transferencia/transferencia.entity/transferencia.entity';

export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
   type: 'sqlite',
   database: ':memory:',
   dropSchema: true,
   entities: [ClienteEntity, GestorEntity, RecursoEducativoEntity, ReporteEntity, TemaEducativoEntity, TransferenciaEntity],
   synchronize: true,
   keepConnectionAlive: true
 }),
 TypeOrmModule.forFeature([ClienteEntity, GestorEntity, RecursoEducativoEntity, ReporteEntity, TemaEducativoEntity, TransferenciaEntity]),
];