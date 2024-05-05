import { IsNumber, IsNotEmpty } from 'class-validator';

export class TransferenciaDto {
    
    @IsNumber()
    @IsNotEmpty()
    monto: number;

    @IsNumber()
    @IsNotEmpty()
    tipo: number;
}