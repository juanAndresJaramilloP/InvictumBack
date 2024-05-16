import {IsNotEmpty, IsString} from 'class-validator';

export class TemaEducativoDto {

 @IsString()
 @IsNotEmpty()
 readonly nombre: string;
 
}