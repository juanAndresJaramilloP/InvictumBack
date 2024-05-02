import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UsuarioEntity {

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
}
