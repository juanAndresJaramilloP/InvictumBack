import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ReporteEntity } from '../../reporte/reporte.entity/reporte.entity';

@Entity()
export class ClienteEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    balance: number;

    @OneToMany(() => ReporteEntity, reporte => reporte.cliente)
    reportes: ReporteEntity[];
}
