import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GestorEntity } from '../../gestor/gestor.entity/gestor.entity';
import { ClienteEntity } from '../../cliente/cliente.entity/cliente.entity';

@Entity()
export class ReporteEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    archivo: string;

    @ManyToOne(() => GestorEntity, gestor => gestor.reportes)
    gestor: GestorEntity;

    @ManyToOne(() => ClienteEntity, cliente => cliente.reportes)
    cliente: ClienteEntity;
}
