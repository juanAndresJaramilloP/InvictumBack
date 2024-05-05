import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteEntity } from './cliente.entity/cliente.entity';
import { ClienteController } from './cliente.controller';

@Module({
  providers: [ClienteService],
  imports: [TypeOrmModule.forFeature([ClienteEntity])],
  controllers: [ClienteController],
})
export class ClienteModule {}
