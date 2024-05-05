import { Module } from '@nestjs/common';
import { ClienteTransferenciaService } from './cliente-transferencia.service';
import { ClienteEntity } from '../cliente/cliente.entity/cliente.entity';
import { TransferenciaEntity } from '../transferencia/transferencia.entity/transferencia.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [ClienteTransferenciaService],
  imports: [TypeOrmModule.forFeature([ClienteEntity, TransferenciaEntity])],
})
export class ClienteTransferenciaModule {}
