import { Column, OneToMany, PrimaryGeneratedColumn, TableInheritance, Entity } from 'typeorm';
import { ReporteEntity } from '../../reporte/reporte.entity/reporte.entity';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
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
