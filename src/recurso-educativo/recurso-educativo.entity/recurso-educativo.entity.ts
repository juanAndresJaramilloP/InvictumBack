import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { TemaEducativoEntity } from '../../tema-educativo/tema-educativo.entity/tema-educativo.entity';

@Entity()
export class RecursoEducativoEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => TemaEducativoEntity, tema => tema.recursos)
    tema: TemaEducativoEntity;
}
