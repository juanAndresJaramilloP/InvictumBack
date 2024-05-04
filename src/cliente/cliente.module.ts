import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteEntity } from './cliente.entity/cliente.entity';

@Module({
  providers: [ClienteService],
  imports: [TypeOrmModule.forFeature([ClienteEntity])],
})
export class ClienteModule {}
