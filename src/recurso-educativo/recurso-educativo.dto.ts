import {IsNotEmpty, IsUrl} from 'class-validator';

export class RecursoEducativoDto {
    
    @IsUrl()
    @IsNotEmpty()
    readonly url: string;
    
}