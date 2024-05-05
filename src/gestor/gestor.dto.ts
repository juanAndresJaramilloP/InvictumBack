import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class GestorDto {

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsString()
    @IsNotEmpty()
    readonly correo: string;

    @IsString()
    @IsNotEmpty()
    readonly contrasena: string;

    @IsNumber()
    @IsNotEmpty()
    readonly rol: number;

    @IsNumber()
    @IsNotEmpty()
    readonly aba: number;
    
}