/* eslint-disable prettier/prettier */
/* archivo src/shared/testing-utils/typeorm-testing-config.ts*/
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteEntity } from '../../cliente/cliente.entity/cliente.entity';
import { GestorEntity } from '../../gestor/gestor.entity/gestor.entity';
import { RecursoEducativoEntity } from '../../recurso-educativo/recurso-educativo.entity/recurso-educativo.entity';
import { ReporteEntity } from '../../reporte/reporte.entity/reporte.entity';
import { TemaEducativoEntity } from '../../tema-educativo/tema-educativo.entity/tema-educativo.entity';
import { TransferenciaEntity } from '../../transferencia/transferencia.entity/transferencia.entity';

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