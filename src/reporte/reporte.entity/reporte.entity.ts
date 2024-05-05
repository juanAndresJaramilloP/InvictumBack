import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ClienteEntity } from '../../cliente/cliente.entity/cliente.entity';
import { GestorEntity } from '../../gestor/gestor.entity/gestor.entity';

@Entity()
export class ReporteEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    archivo: string;

    @ManyToOne(() => ClienteEntity, cliente => cliente.reportes)
    cliente: ClienteEntity;

    @ManyToOne(() => GestorEntity, gestor => gestor.reportes)
    gestor: GestorEntity;
}
