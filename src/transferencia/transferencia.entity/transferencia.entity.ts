import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ClienteEntity } from "../../cliente/cliente.entity/cliente.entity";

@Entity()
export class TransferenciaEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    monto: number;

    @Column()
    tipo: number;

    @ManyToOne(() => ClienteEntity, cliente => cliente.transferencias)
    cliente: ClienteEntity;
}
