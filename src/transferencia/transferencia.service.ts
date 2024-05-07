import { Injectable } from '@nestjs/common';
import { TransferenciaEntity } from './transferencia.entity/transferencia.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TransferenciaService {

    constructor(

        @InjectRepository(TransferenciaEntity)
        private readonly transferenciaRepository: Repository<TransferenciaEntity>
    ){}

    async create(transferencia: TransferenciaEntity): Promise<TransferenciaEntity> {
        return await this.transferenciaRepository.save(transferencia);
    }
}
