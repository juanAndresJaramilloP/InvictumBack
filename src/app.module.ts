import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GestorModule } from './gestor/gestor.module';
import { ClienteModule } from './cliente/cliente.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ReporteModule } from './reporte/reporte.module';

@Module({
  imports: [GestorModule, UsuarioModule, ClienteModule, ReporteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
