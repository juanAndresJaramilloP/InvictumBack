import { Column, Entity } from 'typeorm';
import { UsuarioEntity } from '../../usuario/usuario.entity/usuario.entity';

@Entity()
export class GestorEntity extends UsuarioEntity{
    
    @Column()
    aba: number;

}
