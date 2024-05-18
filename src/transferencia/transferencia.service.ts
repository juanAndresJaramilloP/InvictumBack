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
        const transferencia: TransferenciaEntity = await this.transferenciaRepository.findOne({where:{id}});
        if (!transferencia) {
            throw new BusinessLogicException("The transfer with the given id was not found", BusinessError.NOT_FOUND);
        }
        return transferencia;
    }

    async create(transferencia: TransferenciaEntity): Promise<TransferenciaEntity> {
        return await this.transferenciaRepository.save(transferencia);
    }

    async update(id: string, transferencia: TransferenciaEntity): Promise<TransferenciaEntity> {
        const persistedTransferencia: TransferenciaEntity = await this.transferenciaRepository.findOne({where:{id}});
        if(!persistedTransferencia) {
            throw new BusinessLogicException("The transfer with the given id was not found", BusinessError.NOT_FOUND);
        }
        return await this.transferenciaRepository.save({...persistedTransferencia, ...transferencia});
    }

    async delete(id: string): Promise<void> {
        const persistedTransferencia: TransferenciaEntity = await this.transferenciaRepository.findOne({where:{id}});
        if(!persistedTransferencia) {
            throw new BusinessLogicException("The transfer with the given id was not found", BusinessError.NOT_FOUND);
        }
        await this.transferenciaRepository.remove(persistedTransferencia);
    }
}
