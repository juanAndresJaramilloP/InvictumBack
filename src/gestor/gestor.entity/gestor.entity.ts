import { ChildEntity, Column } from 'typeorm';
import { UsuarioEntity } from '../../usuario/usuario.entity/usuario.entity';

@ChildEntity()
export class GestorEntity extends UsuarioEntity{
    
    @Column()
    aba: number;

}
