import { IsArray, IsUUID } from 'class-validator';

export class IdsDto {
    @IsArray()
    @IsUUID(undefined, { each: true })
    readonly Ids: string[];
}
