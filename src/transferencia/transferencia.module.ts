import { Module } from '@nestjs/common';
import { TransferenciaService } from './transferencia.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransferenciaEntity } from './transferencia.entity/transferencia.entity';
import { TransferenciaController } from './transferencia.controller';

@Module({
  providers: [TransferenciaService],
  imports: [TypeOrmModule.forFeature([TransferenciaEntity])],
  controllers:[TransferenciaController]
})
export class TransferenciaModule {}
