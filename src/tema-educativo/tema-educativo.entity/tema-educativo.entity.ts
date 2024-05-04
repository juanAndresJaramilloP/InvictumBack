import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { RecursoEducativoEntity } from '../../recurso-educativo/recurso-educativo.entity/recurso-educativo.entity';

@Entity()
export class TemaEducativoEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @OneToMany(() => RecursoEducativoEntity, recursoEducativo => recursoEducativo.tema)
    recursos: RecursoEducativoEntity[];
}
