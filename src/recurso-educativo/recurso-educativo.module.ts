import { Module } from '@nestjs/common';
import { RecursoEducativoService } from './recurso-educativo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecursoEducativoEntity } from './recurso-educativo.entity/recurso-educativo.entity';
import { RecursoEducativoController } from './recurso-educativo.controller';

@Module({
  providers: [RecursoEducativoService],
  imports: [TypeOrmModule.forFeature([RecursoEducativoEntity])],
  controllers: [RecursoEducativoController],
})
export class RecursoEducativoModule {}
