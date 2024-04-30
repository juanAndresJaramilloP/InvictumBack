import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GestorModule } from './gestor/gestor.module';
import { ReporteModule } from './reporte/reporte.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [GestorModule, ReporteModule, UsuarioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
