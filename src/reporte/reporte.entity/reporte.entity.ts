import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario } from '../../usuario/usuario.entity/usuario.entity.js';


@Entity()
export class Reporte {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    archivo: string;

    @ManyToOne(() => Usuario, usuario => usuario.reportes)
    usuario: Usuario;
}
