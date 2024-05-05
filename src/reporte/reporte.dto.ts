import { IsNotEmpty, IsString } from "class-validator";

export class ReporteDto {

    @IsString()
    @IsNotEmpty()
    archivo: string;

}