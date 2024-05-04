import { Column, Entity, OneToMany } from 'typeorm';
import { UsuarioEntity } from '../../usuario/usuario.entity/usuario.entity';
import { TransferenciaEntity } from '../../transferencia/transferencia.entity/transferencia.entity';

@Entity()
export class ClienteEntity extends UsuarioEntity{

    @Column()
    balance: number;

    @OneToMany(() => TransferenciaEntity, transferencia => transferencia.cliente)
    transferencias: TransferenciaEntity[];

}
