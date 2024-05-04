import { Module } from '@nestjs/common';
import { RecursoEducativoService } from './recurso-educativo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecursoEducativoEntity } from './recurso-educativo.entity/recurso-educativo.entity';

@Module({
  providers: [RecursoEducativoService],
  imports: [TypeOrmModule.forFeature([RecursoEducativoEntity])],
})
export class RecursoEducativoModule {}
