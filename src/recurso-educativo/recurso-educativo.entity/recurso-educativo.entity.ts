import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { TemaEducativoEntity } from '../../tema-educativo/tema-educativo.entity/tema-educativo.entity';

@Entity()
export class RecursoEducativoEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    url: string;

    @Column()
    name: string;

    @ManyToOne(() => TemaEducativoEntity, tema => tema.recursos)
    tema: TemaEducativoEntity;
}
