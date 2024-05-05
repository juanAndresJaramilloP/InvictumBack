import { Module } from '@nestjs/common';
import { ClienteTransferenciaService } from './cliente-transferencia.service';
import { ClienteEntity } from '../cliente/cliente.entity/cliente.entity';
import { TransferenciaEntity } from '../transferencia/transferencia.entity/transferencia.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteTransferenciaController } from './cliente-transferencia.controller';

@Module({
  providers: [ClienteTransferenciaService],
  imports: [TypeOrmModule.forFeature([ClienteEntity, TransferenciaEntity])],
  controllers: [ClienteTransferenciaController],
})
export class ClienteTransferenciaModule {}
