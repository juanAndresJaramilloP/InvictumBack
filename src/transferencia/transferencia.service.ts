import { Injectable } from '@nestjs/common';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { InjectRepository } from '@nestjs/typeorm';
import { TransferenciaEntity } from './transferencia.entity/transferencia.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransferenciaService {

    constructor(
        @InjectRepository(TransferenciaEntity)
        private readonly transferenciaRepository: Repository<TransferenciaEntity>
    ){}

    async findAll(): Promise<TransferenciaEntity[]> {
        return await this.transferenciaRepository.find();
    }

    async findOne(id: string): Promise<TransferenciaEntity> {

        if (!/^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/.test(id)) {
            throw new BusinessLogicException("Invalid id format. HINT: Valid UUID values are of the form \'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF\'", BusinessError.BAD_REQUEST);
        }

        const transferencia: TransferenciaEntity = await this.transferenciaRepository.findOne({where:{id}});
        if (!transferencia) {
            throw new BusinessLogicException("The transfer with the given id was not found", BusinessError.NOT_FOUND);
        }
        return transferencia;
    }

    async create(transferencia: TransferenciaEntity): Promise<TransferenciaEntity> {
        return await this.transferenciaRepository.save(transferencia);
    }

}
