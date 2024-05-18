import { Module } from '@nestjs/common';
import { TemaEducativoService } from './tema-educativo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemaEducativoEntity } from './tema-educativo.entity/tema-educativo.entity';
import { TemaEducativoController } from './tema-educativo.controller';

@Module({
  providers: [TemaEducativoService],
  imports: [TypeOrmModule.forFeature([TemaEducativoEntity])],
  controllers: [TemaEducativoController]
})
export class TemaEducativoModule {}
