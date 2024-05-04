import { Module } from '@nestjs/common';
import { TransferenciaService } from './transferencia.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransferenciaEntity } from './transferencia.entity/transferencia.entity';

@Module({
  providers: [TransferenciaService],
  imports: [TypeOrmModule.forFeature([TransferenciaEntity])],
})
export class TransferenciaModule {}
