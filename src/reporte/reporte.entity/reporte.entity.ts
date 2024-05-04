import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsuarioEntity } from 'src/usuario/usuario.entity/usuario.entity';

@Entity()
export class ReporteEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    archivo: string;

    @ManyToOne(() => UsuarioEntity, usuario => usuario.reportes)
    usuario: UsuarioEntity;
}
