import { Module } from '@nestjs/common';
import { TemaEducativoService } from './tema-educativo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemaEducativoEntity } from './tema-educativo.entity/tema-educativo.entity';

@Module({
  providers: [TemaEducativoService],
  imports: [TypeOrmModule.forFeature([TemaEducativoEntity])],
})
export class TemaEducativoModule {}
