import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ReporteEntity } from '../../reporte/reporte.entity/reporte.entity';

@Entity()
export class GestorEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    aba: number;

    @OneToMany(() => ReporteEntity, reporte => reporte.gestor)
    reportes: ReporteEntity[];
}
