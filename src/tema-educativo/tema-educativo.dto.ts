import {IsNotEmpty, IsString, IsUrl} from 'class-validator';
export class TemaEducativoDto {

 @IsString()
 @IsNotEmpty()
 readonly nombre: string;
 
}