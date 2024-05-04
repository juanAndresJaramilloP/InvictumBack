import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { RecursoEducativoEntity } from '../../recurso-educativo/recurso-educativo.entity/recurso-educativo.entity';

@Entity()
export class TemaEducativoEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => RecursoEducativoEntity, recursoEducativo => recursoEducativo.tema)
    recursos: RecursoEducativoEntity[];
}
