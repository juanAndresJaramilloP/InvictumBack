import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ReporteEntity } from '../../reporte/reporte.entity/reporte.entity';

export abstract class UsuarioEntity {

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

    @OneToMany(() => ReporteEntity, reporte => reporte.usuario)
    reportes: ReporteEntity[];
}
