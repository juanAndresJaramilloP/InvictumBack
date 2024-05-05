import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ClienteDto {

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
    readonly balance: number;

}
