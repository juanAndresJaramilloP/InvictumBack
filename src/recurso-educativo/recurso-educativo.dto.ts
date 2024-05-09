import {IsNotEmpty, IsString, IsUrl} from 'class-validator';
export class RecursoEducativoDto {

 @IsString()
 @IsNotEmpty()
 readonly name: string;
 
 @IsUrl()
 @IsNotEmpty()
 readonly url: string;
 
}