import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reporte } from '../../reporte/reporte.entity/reporte.entity.js';


@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    nombre: string;

    @OneToMany(() => Reporte, reporte => reporte.usuario)
    reportes: Reporte[];
}
