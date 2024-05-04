import { Column, OneToMany, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TransferenciaEntity } from '../../transferencia/transferencia.entity/transferencia.entity';
import { ReporteEntity } from '../../reporte/reporte.entity/reporte.entity';

@Entity()
export class ClienteEntity {

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
    balance: number;

    @OneToMany(() => TransferenciaEntity, transferencia => transferencia.cliente)
    transferencias: TransferenciaEntity[];

    @OneToMany(() => ReporteEntity, reporte => reporte.cliente)
    reportes: ReporteEntity[];

}
