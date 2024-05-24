import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GestorModule } from './gestor/gestor.module';
import { ClienteModule } from './cliente/cliente.module';
import { ReporteModule } from './reporte/reporte.module';
import {TransferenciaModule} from './transferencia/transferencia.module';
import { TemaEducativoModule } from './tema-educativo/tema-educativo.module';
import { RecursoEducativoModule } from './recurso-educativo/recurso-educativo.module';
import { ClienteReporteModule } from './cliente-reporte/cliente-reporte.module';
import { GestorReporteModule } from './gestor-reporte/gestor-reporte.module';
import { ClienteTransferenciaModule } from './cliente-transferencia/cliente-transferencia.module';
import { TemaeducativoRecursoeducativoModule } from './temaeducativo-recursoeducativo/temaeducativo-recursoeducativo.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [GestorModule, ClienteModule, ReporteModule, TransferenciaModule, TemaEducativoModule, RecursoEducativoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'postgres',
      database: 'Invictum',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }),
    ClienteReporteModule,
    GestorReporteModule,
    ClienteTransferenciaModule,
    TemaeducativoRecursoeducativoModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
