import { IsArray, IsUUID } from 'class-validator';

export class RecursoEducativoIdsDto {
    @IsArray()
    @IsUUID(undefined, { each: true })
    readonly recursosIds: string[];
}
