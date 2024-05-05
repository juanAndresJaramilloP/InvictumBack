import { Entity, Column,PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ReporteEntity } from '../../reporte/reporte.entity/reporte.entity';

@Entity()
export class GestorEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    correo: string;

    @Column()
    contrasena: string;

    @Column()
    rol: number;

    @Column()
    aba: number;

    @OneToMany(() => ReporteEntity, reporte => reporte.gestor)
    reportes: ReporteEntity[];

}
